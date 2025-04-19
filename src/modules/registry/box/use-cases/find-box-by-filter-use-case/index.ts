import { boxModel } from '@/modules/registry/box/model'
import { BoxSchema } from '@/modules/registry/box//schema'
import { IFindBoxByFilterUseCase } from '@/modules/registry/box/use-cases/find-box-by-filter-use-case/types'

export class FindBoxByFilterUseCase implements IFindBoxByFilterUseCase {
    value: string | number
    key: string
    userModel = boxModel

    prepare = (value: string | number, key: string): void => {
        this.value = value
        this.key = key
    }
    execute = async (): Promise<BoxSchema[]> => {
        return this.userModel.find({ [this.key]: this.value })
    }
}
