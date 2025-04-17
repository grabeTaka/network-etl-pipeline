import { SourceExtractorIntegration } from '@/modules/source-extractor/integration'
import { ISourceExtractorIntegration } from '@/modules/source-extractor/integration/type'
import {
    BoxSchema,
    CableSchema,
    CustomerSchema,
    DropCableSchema,
} from '@/modules/source-extractor/schema'
import { ISourceExtractorService } from '@/modules/source-extractor/service/type'
import { GetAllBoxesUseCase } from '@/modules/source-extractor/use-cases/get-all-boxes-use-case'
import { GetAllCablesUseCase } from '@/modules/source-extractor/use-cases/get-all-cables-use-case'
import { GetAllCustomersUseCase } from '@/modules/source-extractor/use-cases/get-all-customers-use-case'
import { GetAllDropCablesUseCase } from '@/modules/source-extractor/use-cases/get-all-drop-cables-use-case'

export class SourceExtractorService implements ISourceExtractorService {
    sourceExtractorIntegration: ISourceExtractorIntegration

    constructor() {
        this.sourceExtractorIntegration = new SourceExtractorIntegration()
    }

    getAllBoxes(): Promise<BoxSchema[]> {
        const getAllBoxesUseCase = new GetAllBoxesUseCase(
            this.sourceExtractorIntegration,
        )
        return getAllBoxesUseCase.execute()
    }
    getAllCables(): Promise<CableSchema[]> {
        const getAllCablesUseCase = new GetAllCablesUseCase(
            this.sourceExtractorIntegration,
        )
        return getAllCablesUseCase.execute()
    }
    getAllCustomers(): Promise<CustomerSchema[]> {
        const getAllCustomersUseCase = new GetAllCustomersUseCase(
            this.sourceExtractorIntegration,
        )
        return getAllCustomersUseCase.execute()
    }
    getAllDropCables(): Promise<DropCableSchema[]> {
        const getAllDropCablesUseCase = new GetAllDropCablesUseCase(
            this.sourceExtractorIntegration,
        )
        return getAllDropCablesUseCase.execute()
    }
}

export const sourceExtractorService = new SourceExtractorService()
