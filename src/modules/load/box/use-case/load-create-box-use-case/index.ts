import { ILoadCreateBoxUseCase } from '@/modules/load/box/use-case/load-create-box-use-case/type'
import { Box } from '@ozmap/ozmap-sdk'
import { ILoadBoxIntegration } from '@/modules/load/box/integration/type'
import { loadBoxIntegration } from '@/modules/load/box/integration'

export class LoadCreateBoxUseCase implements ILoadCreateBoxUseCase {
    private data: Box
    private boxTypeId: string;
    private loadBoxIntegration: ILoadBoxIntegration

    constructor() {
        this.loadBoxIntegration = loadBoxIntegration
    }

    prepare = (data: Box) => {
        this.data = data
    }

    execute = async () => {
        return this.loadBoxIntegration.create(this.data)
    }
}
