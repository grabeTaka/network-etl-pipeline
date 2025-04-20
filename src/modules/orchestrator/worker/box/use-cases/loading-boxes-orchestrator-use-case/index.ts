import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { ILoadingBoxesOrchestratorUseCase } from '@/modules/orchestrator/worker/box/use-cases/loading-boxes-orchestrator-use-case/type'
import { IRegistryBoxService } from '@/modules/registry/box/service/type'
import { FilterBoxUseCase } from '../filter-box-use-case'
import { ILoadBoxTypeService } from '@/modules/load/box-type/service/type'
import { loadBoxTypeService } from '@/modules/load/box-type/service'
import { ITransformBoxService } from '@/modules/transform/box/service/type'
import { transformBoxService } from '@/modules/transform/box/service'
import { ILoadBoxService } from '@/modules/load/box/service/type'
import { loadBoxService } from '@/modules/load/box/service'
import registryBoxService from '@/modules/registry/box/service'

export class LoadingBoxesOrchestratorUseCase
    implements ILoadingBoxesOrchestratorUseCase
{
    private extractedBoxData: ExtractBoxSchema
    private registryBoxService: IRegistryBoxService
    private loadBoxTypeService: ILoadBoxTypeService
    private transformBoxService: ITransformBoxService
    private loadBoxService: ILoadBoxService

    constructor() {
        this.registryBoxService = registryBoxService
        this.loadBoxTypeService = loadBoxTypeService
        this.transformBoxService = transformBoxService
        this.loadBoxService = loadBoxService
    }

    prepare(data: ExtractBoxSchema): void {
        this.extractedBoxData = data
    }

    async execute(): Promise<void> {
        const [registeredBox] = await this.registryBoxService.findByFilter(
            this.extractedBoxData.id,
            'externalSourceId',
        )

        console.log(registeredBox)
        if (!registeredBox) {
            console.log(this.extractedBoxData.type)
            const boxType = await this.loadBoxTypeService.createOrFindOne(
                'code',
                this.extractedBoxData.type.toUpperCase(),
            )
            const transformBoxDTO = this.transformBoxService.transformToCreate(
                boxType.id as string,
                this.extractedBoxData,
            )
            const createdLoadBox =
                await this.loadBoxService.create(transformBoxDTO)
            await this.registryBoxService.create(
                this.extractedBoxData,
                createdLoadBox.id as string,
            )
            return
        }

        const filterBoxUseCase = new FilterBoxUseCase()
        filterBoxUseCase.prepare(registeredBox, this.extractedBoxData)
        const { boxNeedsUpdate, boxTypeFieldUpdate } =
            filterBoxUseCase.execute()

        if (boxNeedsUpdate) {
            let boxTypeId = null
            if (boxTypeFieldUpdate) {
                const boxType = await this.loadBoxTypeService.createOrFindOne(
                    'code',
                    this.extractedBoxData.type.toUpperCase(),
                )
                boxTypeId = boxType.id
            }

            const transformBoxDTO = this.transformBoxService.transformToUpdate(
                boxTypeId,
                this.extractedBoxData,
            )
            await this.loadBoxService.update(
                transformBoxDTO,
                registeredBox.externalLoadId,
            )
            await this.registryBoxService.update(
                registeredBox._id,
                this.extractedBoxData,
            )
        }
    }
}

//Check the name of box because the name is unique in project
