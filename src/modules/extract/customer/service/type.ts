import { CustomerSchema } from '@/modules/extract/customer/schema'

export interface IExtractCustomerService {
    getAll(): Promise<CustomerSchema[]>
}
