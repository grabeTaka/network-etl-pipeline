import { ILoadCreateCableUseCase } from '@/modules/load/cable/use-case/load-create-cable-use-case/type'
import { CreateCableDTO } from '@ozmap/ozmap-sdk'
import { ILoadCableIntegration } from '@/modules/load/cable/integration/type'
import { loadCableIntegration } from '@/modules/load/cable/integration'

export class LoadCreateCableUseCase implements ILoadCreateCableUseCase {
    private data: CreateCableDTO
    private loadCableIntegration: ILoadCableIntegration

    constructor() {
        this.loadCableIntegration = loadCableIntegration
    }

    prepare = (data: CreateCableDTO) => {
        this.data = data
    }

    execute = async () => {
        return this.loadCableIntegration.create(this.data)
    }
}
