import { cableModel } from '@/modules/registry/cable/model'
import { CableSchema } from '@/modules/registry/cable/schema'
import { IFindCableByFilterUseCase } from '@/modules/registry/cable/use-cases/find-cable-by-filter-use-case/types'

export class FindCableByFilterUseCase implements IFindCableByFilterUseCase {
    value: string | number
    key: string
    cableModel = cableModel

    prepare = (value: string | number, key: string): void => {
        this.value = value
        this.key = key
    }
    execute = async (): Promise<CableSchema[]> => {
        return this.cableModel.find({ [this.key]: this.value })
    }
}
