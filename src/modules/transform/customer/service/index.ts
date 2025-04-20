import { CustomerSchema } from '@/modules/extract/customer/schema'
import { ITransformCustomerService } from '@/modules/transform/customer/service/type'
import { CreatePropertyDTO, UpdatePropertyDTO } from '@ozmap/ozmap-sdk'
import { TransformToCreateDataUseCase } from '@/modules/transform/customer/use-cases/transform-to-create-data-use-case'
import { TransformToUpdateDataUseCase } from '@/modules/transform/customer/use-cases/transform-to-update-data-use-case'

export class TransformCustomerService implements ITransformCustomerService {
    transformToCreate(
        externaLoadBoxId: string,
        extractedCustomer: CustomerSchema,
    ): CreatePropertyDTO {
        console.log(externaLoadBoxId)
        console.log(extractedCustomer)
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

export const transformCustomerService = new TransformCustomerService()
