import { ISourceExtractorIntegration } from '@/modules/source-extractor/integration/type'
import { CableSchema } from '@/modules/source-extractor/schema'
import { IGetAllCablesUseCase } from '@/modules/source-extractor/use-cases/get-all-cables-use-case/type'

export class GetAllCablesUseCase implements IGetAllCablesUseCase {
    private sourceExtractorIntegration: ISourceExtractorIntegration

    constructor(sourceExtractorIntegration: ISourceExtractorIntegration) {
        this.sourceExtractorIntegration = sourceExtractorIntegration
    }

    execute = async (): Promise<CableSchema[]> => {
        return await this.sourceExtractorIntegration.getCables()
    }
}
