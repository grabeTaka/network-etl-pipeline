import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'

export interface ILoadingCustomersOrchestratorUseCase {
    prepare(data: ExtractCustomerSchema): void
    execute(): Promise<void>
}
