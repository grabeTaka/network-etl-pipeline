import { IExtractCustomerIntegration } from '@/modules/extract/customer/integration/type'
import { CustomerSchema } from '@/modules/extract/customer/schema/index'
import { IGetAllUseCase } from '@/modules/extract/customer/use-cases/get-all-use-case/type'

export class GetAllUseCase implements IGetAllUseCase {
    private extractCustomerIntegratrion: IExtractCustomerIntegration

    constructor(extractCableIntegratrion: IExtractCustomerIntegration) {
        this.extractCustomerIntegratrion = extractCableIntegratrion
    }

    execute = async (): Promise<CustomerSchema[]> => {
        return await this.extractCustomerIntegratrion.getAll()
    }
}
