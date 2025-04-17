import { ISourceExtractorIntegration } from '@/modules/source-extractor/integration/type'
import { DropCableSchema } from '@/modules/source-extractor/schema'
import { IGetAllDropCablesUseCase } from '@/modules/source-extractor/use-cases/get-all-drop-cables-use-case/type'

export class GetAllDropCablesUseCase implements IGetAllDropCablesUseCase {
    private sourceExtractorIntegration: ISourceExtractorIntegration

    constructor(sourceExtractorIntegration: ISourceExtractorIntegration) {
        this.sourceExtractorIntegration = sourceExtractorIntegration
    }

    execute = async (): Promise<DropCableSchema[]> => {
        return await this.sourceExtractorIntegration.getDropCables()
    }
}
