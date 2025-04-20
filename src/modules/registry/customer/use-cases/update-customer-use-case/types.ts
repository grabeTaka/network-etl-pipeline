import { CustomerSchema } from '@/modules/registry/customer/schema'

export interface IUpdateCustomerUseCase {
    prepare: (id: string, value: Partial<CustomerSchema>) => void
    execute: () => Promise<void>
}
