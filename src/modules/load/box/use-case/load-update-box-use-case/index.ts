import { ILoadUpdateBoxUseCase } from '@/modules/load/box/use-case/load-update-box-use-case/type'
import { UpdateBoxDTO } from '@ozmap/ozmap-sdk'
import { ILoadBoxIntegration } from '@/modules/load/box/integration/type'
import { loadBoxIntegration } from '@/modules/load/box/integration'

export class LoadUpdateBoxUseCase implements ILoadUpdateBoxUseCase {
    private data: UpdateBoxDTO
    private externalLoadId: string
    private loadBoxIntegration: ILoadBoxIntegration

    constructor() {
        this.loadBoxIntegration = loadBoxIntegration
    }

    prepare = (data: UpdateBoxDTO, externalLoadId: string) => {
        this.data = data
        this.externalLoadId = externalLoadId
    }

    execute = async () => {
        return this.loadBoxIntegration.update(this.data, this.externalLoadId)
    }
}
