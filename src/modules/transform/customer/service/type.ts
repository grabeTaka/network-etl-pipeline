import { CustomerSchema as ExtractedCustomerSchema } from '@/modules/extract/customer/schema'
import { CreatePropertyDTO, UpdatePropertyDTO } from '@ozmap/ozmap-sdk'

export interface ITransformCustomerService {
    transformToCreate(
        externaLoadBoxId: string,
        extractedCustomer: ExtractedCustomerSchema,
    ): CreatePropertyDTO
    transformToUpdate(
        externaLoadBoxId: string | null,
        extractedCustomer: ExtractedCustomerSchema,
    ): UpdatePropertyDTO
}
