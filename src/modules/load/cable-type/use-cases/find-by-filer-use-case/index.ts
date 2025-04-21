import { CableType } from '@ozmap/ozmap-sdk'
import { IFindByFilterUseCase } from '@/modules/load/cable-type/use-cases/find-by-filer-use-case/type'
import { ILoadCableTypeIntegration } from '@/modules/load/cable-type/integration/type'
import { loadCableTypeIntegration } from '@/modules/load/cable-type/integration'

export class FindByFilterUseCase implements IFindByFilterUseCase {
    private loadCableTypeIntegration: ILoadCableTypeIntegration
    private key: string
    private value: string | number

    constructor() {
        this.loadCableTypeIntegration = loadCableTypeIntegration
    }

    prepare(key: string, value: string | number) {
        this.key = key
        this.value = value
    }

    execute(): Promise<CableType> {
        return this.loadCableTypeIntegration.findByFilter(this.value, this.key)
    }
}
