import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'
import { loadCableTypeIntegration } from '@/modules/load/cable-type/integration'
import { ILoadCableTypeIntegration } from '@/modules/load/cable-type/integration/type'
import { loadFiberProfileIntegration } from '@/modules/load/fiber-profile/integration'
import { ILoadFiberProfileIntegration } from '@/modules/load/fiber-profile/integration/type'
import { ILoadingCablesOrchestratorUseCase } from '@/modules/orchestrator/worker/cable/use-cases/loading-cables-orchestrator-use-case/type'

export class LoadingCablesOrchestratorUseCase
    implements ILoadingCablesOrchestratorUseCase
{
    private extractedCableSchema: ExtractCableSchema
    private loadCableTypeIntegration: ILoadCableTypeIntegration
    private loadFiberProfileIntegration: ILoadFiberProfileIntegration

    constructor() {
        this.loadCableTypeIntegration = loadCableTypeIntegration
        this.loadFiberProfileIntegration = loadFiberProfileIntegration
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

        console.log('------------')
        console.log(cableType)
        console.log('------------')

        //TODO CADASTRAR FIBER PROFILE
        //TODO CADASTRAR CABLE TYPE
        // CADASTRAR CABLES
    }
}
