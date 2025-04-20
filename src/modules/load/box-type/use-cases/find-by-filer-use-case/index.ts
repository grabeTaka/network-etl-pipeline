import { BoxType } from '@ozmap/ozmap-sdk'
import { IFindByFilterUseCase } from '@/modules/load/box-type/use-cases/find-by-filer-use-case/type'
import { ILoadBoxTypeIntegration } from '@/modules/load/box-type/integration/type'
import { loadBoxTypeIntegration } from '@/modules/load/box-type/integration'

export class FindByFilterUseCase implements IFindByFilterUseCase {
    private loadBoxTypeIntegration: ILoadBoxTypeIntegration
    private key: string
    private value: string | number

    constructor() {
        this.loadBoxTypeIntegration = loadBoxTypeIntegration
    }
    prepare(key: string, value: string | number) {
        this.key = key
        this.value = value
    }
    execute(): Promise<BoxType> {
        return this.loadBoxTypeIntegration.findByFilter(this.value, this.key)
    }
}
