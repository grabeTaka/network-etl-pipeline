import { ISourceExtractorIntegration } from '@/modules/source-extractor/integration/type'
import { CustomerSchema } from '@/modules/source-extractor/schema'
import { IGetAllCustomersUseCase } from '@/modules/source-extractor/use-cases/get-all-customers-use-case/type'

export class GetAllCustomersUseCase implements IGetAllCustomersUseCase {
    private sourceExtractorIntegration: ISourceExtractorIntegration

    constructor(sourceExtractorIntegration: ISourceExtractorIntegration) {
        this.sourceExtractorIntegration = sourceExtractorIntegration
    }

    execute = async (): Promise<CustomerSchema[]> => {
        return await this.sourceExtractorIntegration.getCustomers()
    }
}
