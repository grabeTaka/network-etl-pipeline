import { propertyModel } from '@/modules/registry/property/model'
import { PropertySchema } from '@/modules/registry/property/schema'
import { IFindPropertyByFilterUseCase } from '@/modules/registry/property/use-cases/find-property-by-filter-use-case/types'

export class FindPropertyByFilterUseCase
    implements IFindPropertyByFilterUseCase
{
    value: string | number
    key: string
    propertyModel = propertyModel

    prepare = (value: string | number, key: string): void => {
        this.value = value
        this.key = key
    }
    execute = async (): Promise<PropertySchema[]> => {
        return this.propertyModel.find({ [this.key]: this.value })
    }
}
