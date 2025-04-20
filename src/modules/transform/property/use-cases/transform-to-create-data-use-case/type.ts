import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { CreatePropertyDTO } from '@ozmap/ozmap-sdk'

export interface ITransformToCreateDataUseCase {
    prepare(externalLoadBoxId: string, customer: ExtractCustomerSchema): void
    execute(): CreatePropertyDTO
}
