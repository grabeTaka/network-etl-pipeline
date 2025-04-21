import { BoxType, CableType } from '@ozmap/ozmap-sdk'
import { ICreateCableTypeUseCase } from '@/modules/load/cable-type/use-cases/create-cable-type-use-case/type'
import { ILoadCableTypeIntegration } from '@/modules/load/cable-type/integration/type'
import { loadCableTypeIntegration } from '@/modules/load/cable-type/integration'

export class CreateCableTypeUseCase implements ICreateCableTypeUseCase {
    private fiberProfileId: string
    private loadCableTypeIntegration: ILoadCableTypeIntegration

    constructor() {
        this.loadCableTypeIntegration = loadCableTypeIntegration
    }

    prepare(fiberProfileId: string) {
        this.fiberProfileId = fiberProfileId
    }

    execute(): Promise<CableType> {
        return this.loadCableTypeIntegration.create(this.fiberProfileId)
    }
}
