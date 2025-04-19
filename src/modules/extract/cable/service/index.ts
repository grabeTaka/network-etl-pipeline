import { CableSchema } from '@/modules/extract/cable/schema'
import { IExtractCableService } from '@/modules/extract/cable/service/type'
import { GetAllUseCase } from '@/modules/extract/cable/use-cases/get-all-use-case'
import { IExtractCableIntegration } from '@/modules/extract/cable/integration/type'
import { ExtractCableIntegration } from '@/modules/extract/cable/integration'


export class ExtractCableService implements IExtractCableService {
    private extractCableIntegration: IExtractCableIntegration
    constructor() {
        this.extractCableIntegration = new ExtractCableIntegration
    }
    getAll(): Promise<CableSchema[]> {
        const getAllCablesUseCase = new GetAllUseCase(
            this.extractCableIntegration,
        )
        return getAllCablesUseCase.execute()
    }
}

export const extractCableService = new ExtractCableService()
