import { CustomerSchema } from '@/modules/extract/customer/schema'

export interface IExtractCustomerIntegration {
    getAll(): Promise<CustomerSchema[]>
    findOne(id: number): Promise<CustomerSchema>
}
