import { CustomerSchema } from '@/modules/registry/customer/schema'

export interface IRegistryCustomerService {
    create(box: CustomerSchema, externalLoadBoxId: string): Promise<CustomerSchema>
    findByFilter(value: string | number, key: string): Promise<CustomerSchema[]>
    update(id: string, value: Partial<CustomerSchema>)
}
