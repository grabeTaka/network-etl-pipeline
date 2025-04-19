import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { ILoadingBoxesOrchestratorUseCase } from '@/modules/orchestrator/worker/box/use-cases/loading-boxes-orchestrator-use-case/type'
import boxService from '@/modules/registry/box/service'
import { IBoxService as IRegistryBoxService } from '@/modules/registry/box/service/type'
import { FilterBoxUseCase } from '../filter-box-use-case'
import { ILoadBoxTypeService } from '@/modules/load/box-type/service/type'
import { loadBoxTypeService } from '@/modules/load/box-type/service'

export class LoadingBoxesOrchestratorUseCase
    implements ILoadingBoxesOrchestratorUseCase
{
    private extractedBoxData: ExtractBoxSchema
    private registryBoxService: IRegistryBoxService
    private loadBoxTypeService: ILoadBoxTypeService
    
    constructor() {
        this.registryBoxService = boxService
        this.loadBoxTypeService = loadBoxTypeService
    }

    prepare(data: ExtractBoxSchema): void {
        this.extractedBoxData = data
    }

    async execute(): Promise<void> {
        const [registeredBox] = await this.registryBoxService.findByFilter(
            this.extractedBoxData.id,
            'external_source_id',
        )

        console.log(registeredBox)
        if (!registeredBox) {
            console.log(this.extractedBoxData.type)
            const boxType = await this.loadBoxTypeService.createOrFindOne('code', this.extractedBoxData.type.toUpperCase())
            console.log('--------------------')
            console.log(boxType)
            // TODO: Check existence of box type
            // TODO: Create box in SDK
            return
        }

        const filterBoxUseCase = new FilterBoxUseCase()
        filterBoxUseCase.prepare(registeredBox, this.extractedBoxData)
        const boxNeedsUpdate = filterBoxUseCase.execute()
    }
}


//TODO ALTERAR COLLECTION MONGO PARA SNEAKCASE
//TODO ADICIONAR UPERCASE AO BOX TYPE