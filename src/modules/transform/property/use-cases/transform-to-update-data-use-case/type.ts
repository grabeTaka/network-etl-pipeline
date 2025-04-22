import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { UpdatePropertyDTO } from '@ozmap/ozmap-sdk'

export interface ITransformToUpdateDataUseCase {
    prepare(externalLoadBoxId: string, customer: ExtractCustomerSchema): void
    execute(): UpdatePropertyDTO
}
