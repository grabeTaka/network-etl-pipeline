import { CustomerSchema } from '@/modules/source-extractor/schema'

export interface IGetAllCustomersUseCase {
    execute(): Promise<CustomerSchema[]>
}
