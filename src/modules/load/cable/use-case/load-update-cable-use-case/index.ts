import { ILoadUpdateCableUseCase } from '@/modules/load/cable/use-case/load-update-cable-use-case/type'
import { UpdateCableDTO } from '@ozmap/ozmap-sdk'
import { ILoadCableIntegration } from '@/modules/load/cable/integration/type'
import { loadCableIntegration } from '@/modules/load/cable/integration'

export class LoadUpdateCableUseCase implements ILoadUpdateCableUseCase {
    private data: UpdateCableDTO
    private externalLoadId: string
    private loadCableIntegration: ILoadCableIntegration

    constructor() {
        this.loadCableIntegration = loadCableIntegration
    }

    prepare = (data: UpdateCableDTO, externalLoadId: string) => {
        this.data = data
        this.externalLoadId = externalLoadId
    }

    execute = async () => {
        return this.loadCableIntegration.update(this.data, this.externalLoadId)
    }
}
