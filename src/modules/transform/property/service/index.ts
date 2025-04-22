import { CustomerSchema } from '@/modules/extract/customer/schema'
import { ITransformPropertyService } from '@/modules/transform/property/service/type'
import { CreatePropertyDTO, UpdatePropertyDTO } from '@ozmap/ozmap-sdk'
import { TransformToCreateDataUseCase } from '@/modules/transform/property/use-cases/transform-to-create-data-use-case'
import { TransformToUpdateDataUseCase } from '@/modules/transform/property/use-cases/transform-to-update-data-use-case'

export class TransformPropertyService implements ITransformPropertyService {
    transformToCreate(
        externaLoadBoxId: string,
        extractedCustomer: CustomerSchema,
    ): CreatePropertyDTO {
        const useCase = new TransformToCreateDataUseCase()
        useCase.prepare(externaLoadBoxId, extractedCustomer)
        return useCase.execute()
    }

    transformToUpdate(
        externaLoadBoxId: string,
        extractedCustomer: CustomerSchema,
    ): UpdatePropertyDTO {
        const useCase = new TransformToUpdateDataUseCase()
        useCase.prepare(externaLoadBoxId, extractedCustomer)
        return useCase.execute()
    }
}

export const transformPropertyService = new TransformPropertyService()
