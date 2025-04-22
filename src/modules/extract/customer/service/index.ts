import { CustomerSchema } from '@/modules/extract/customer/schema'
import { IExtractCustomerService } from '@/modules/extract/customer/service/type'
import { GetAllUseCase } from '@/modules/extract/customer/use-cases/get-all-use-case'
import { IExtractCustomerIntegration } from '@/modules/extract/customer/integration/type'
import { ExtractCustomerIntegratrion } from '@/modules/extract/customer/integration'

export class ExtractCustomerService implements IExtractCustomerService {
    private extractCustomerIntegration: IExtractCustomerIntegration
    constructor() {
        this.extractCustomerIntegration = new ExtractCustomerIntegratrion()
    }
    getAll(): Promise<CustomerSchema[]> {
        const getAllCustomeresUseCase = new GetAllUseCase(
            this.extractCustomerIntegration,
        )
        return getAllCustomeresUseCase.execute()
    }
}

export const extractCustomerService = new ExtractCustomerService()
