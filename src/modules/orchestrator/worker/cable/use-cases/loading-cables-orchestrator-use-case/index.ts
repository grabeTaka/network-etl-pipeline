import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'
import { loadCableTypeIntegration } from '@/modules/load/cable-type/integration'
import { ILoadCableTypeIntegration } from '@/modules/load/cable-type/integration/type'
import { loadCableService } from '@/modules/load/cable/service'
import { ILoadCableService } from '@/modules/load/cable/service/type'
import { loadFiberProfileIntegration } from '@/modules/load/fiber-profile/integration'
import { ILoadFiberProfileIntegration } from '@/modules/load/fiber-profile/integration/type'
import { ILoadingCablesOrchestratorUseCase } from '@/modules/orchestrator/worker/cable/use-cases/loading-cables-orchestrator-use-case/type'
import registryBoxService from '@/modules/registry/box/service'
import { IRegistryBoxService } from '@/modules/registry/box/service/type'
import registryCableService from '@/modules/registry/cable/service'
import { IRegistryCableService } from '@/modules/registry/cable/service/type'
import { transformCableService } from '@/modules/transform/cable/service'
import { ITransformCableService } from '@/modules/transform/cable/service/type'
import { FilterCableUseCase } from '../filter-property-use-case'

export class LoadingCablesOrchestratorUseCase
    implements ILoadingCablesOrchestratorUseCase
{
    private extractedCableSchema: ExtractCableSchema
    private loadCableTypeIntegration: ILoadCableTypeIntegration
    private loadFiberProfileIntegration: ILoadFiberProfileIntegration
    private registryBoxService: IRegistryBoxService
    private registryCableService: IRegistryCableService
    private transformCableService: ITransformCableService
    private loadCableService: ILoadCableService

    constructor() {
        this.loadCableTypeIntegration = loadCableTypeIntegration
        this.loadFiberProfileIntegration = loadFiberProfileIntegration
        this.registryBoxService = registryBoxService
        this.registryCableService = registryCableService
        this.transformCableService = transformCableService
        this.loadCableService = loadCableService
    }

    prepare(data: ExtractCableSchema): void {
        this.extractedCableSchema = data
    }

    async execute(): Promise<void> {
        let cableType = await this.loadCableTypeIntegration.findByFilter(
            '1L6F',
            'code',
        )

        if (!cableType) {
            let fiberProfile =
                await this.loadFiberProfileIntegration.findByFilter(
                    'G.652D',
                    'name',
                )

            if (!fiberProfile) {
                fiberProfile = await this.loadFiberProfileIntegration.create()
            }

            cableType = await this.loadCableTypeIntegration.create(
                fiberProfile.id as string,
            )
        }

        const [registeredBoxA] = await this.registryBoxService.findByFilter(
            this.extractedCableSchema.boxes_connected[0],
            'externalSourceId',
        )

        const [registeredBoxB] = await this.registryBoxService.findByFilter(
            this.extractedCableSchema.boxes_connected[1],
            'externalSourceId',
        )

        if (!registeredBoxA || !registeredBoxB) {
            return
        }

        const [registeredCable] = await this.registryCableService.findByFilter(
            this.extractedCableSchema.id,
            'externalSourceId',
        )
        if (!registeredCable) {
            const transformCableDTO =
                await this.transformCableService.transformToCreate(
                    registeredBoxA.externalLoadId,
                    registeredBoxB.externalLoadId,
                    cableType.id as string,
                    this.extractedCableSchema,
                )
            const createdLoadCable =
                await this.loadCableService.create(transformCableDTO)
            await this.registryCableService.create(
                this.extractedCableSchema,
                createdLoadCable.id as string,
                registeredBoxA._id,
                registeredBoxB._id,
            )
            return
        }

        const filterCableUseCase = new FilterCableUseCase()
        filterCableUseCase.prepare(
            registeredCable,
            this.extractedCableSchema,
            registeredBoxA,
            registeredBoxB,
        )
        const { cableNeedsUpdate } = filterCableUseCase.execute()

        if (cableNeedsUpdate) {
            const transformCableDTO =
                await this.transformCableService.transformToUpdate(
                    registeredBoxA.externalLoadId,
                    registeredBoxB.externalLoadId,
                    this.extractedCableSchema,
                )
            const updateLoadCable = await this.loadCableService.update(
                transformCableDTO,
                registeredCable.externalLoadId,
            )
            await this.registryCableService.update(
                registeredCable._id,
                updateLoadCable,
                registeredBoxA._id,
                registeredBoxB._id,
            )
        }
    }
}

//TODO try to change cableType for already registered
