import { customerModel } from '@/modules/registry/customer/model'
import { CustomerSchema } from '@/modules/registry/customer/schema'
import { IFindCustomerByFilterUseCase } from '@/modules/registry/customer/use-cases/find-customer-by-filter-use-case/types'

export class FindCustomerByFilterUseCase
    implements IFindCustomerByFilterUseCase
{
    value: string | number
    key: string
    customerModel = customerModel

    prepare = (value: string | number, key: string): void => {
        this.value = value
        this.key = key
    }
    execute = async (): Promise<CustomerSchema[]> => {
        return this.customerModel.find({ [this.key]: this.value })
    }
}
