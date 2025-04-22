import { CustomerSchema } from '@/modules/extract/customer/schema'

export interface IGetAllUseCase {
    execute(): Promise<CustomerSchema[]>
}
