import { ISourceExtractorIntegration } from '@/modules/source-extractor/integration/type'
import { BoxSchema } from '@/modules/source-extractor/schema'
import { IGetAllBoxesUseCase } from '@/modules/source-extractor/use-cases/get-all-boxes-use-case/type'

export class GetAllBoxesUseCase implements IGetAllBoxesUseCase {
    private sourceExtractorIntegration: ISourceExtractorIntegration

    constructor(sourceExtractorIntegration: ISourceExtractorIntegration) {
        this.sourceExtractorIntegration = sourceExtractorIntegration
    }

    execute = async (): Promise<BoxSchema[]> => {
        return await this.sourceExtractorIntegration.getBoxes()
    }
}
