import { BoxSchema } from '@/modules/extract/box/schema'
import { IBoxesDataJobOrchestratorUseCase } from './type'
import { IBoxLoaderService } from '@/modules/load/box/service/type'
import { boxLoaderService } from '@/modules/load/box/service'

export class BoxesDataJobOrchestratorUseCase
    implements IBoxesDataJobOrchestratorUseCase
{
    private data: BoxSchema[]
    private boxLoaderService: IBoxLoaderService

    constructor() {
        this.boxLoaderService = boxLoaderService
    }

    prepare(data: BoxSchema[]) {
        this.data = data
    }
    execute(): void {
        this.data.map((box) => {
            this.boxLoaderService.create(box)
        })
    }
}
