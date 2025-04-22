import { ILoadCreateBoxUseCase } from '@/modules/load/box/use-case/load-create-box-use-case/type'
import { CreateBoxDTO } from '@ozmap/ozmap-sdk'
import { ILoadBoxIntegration } from '@/modules/load/box/integration/type'
import { loadBoxIntegration } from '@/modules/load/box/integration'

export class LoadCreateBoxUseCase implements ILoadCreateBoxUseCase {
    private data: CreateBoxDTO
    private loadBoxIntegration: ILoadBoxIntegration

    constructor() {
        this.loadBoxIntegration = loadBoxIntegration
    }

    prepare = (data: CreateBoxDTO) => {
        this.data = data
    }

    execute = async () => {
        return this.loadBoxIntegration.create(this.data)
    }
}
