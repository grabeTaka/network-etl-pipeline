import { CustomerSchema } from '@/modules/registry/customer/schema/index'

export interface IFindCustomerByFilterUseCase {
    prepare: (value: string | number, key: string) => void
    execute: () => Promise<CustomerSchema[]>
}
