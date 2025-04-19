import { BoxSchema } from '@/modules/extract/box/schema'
import { IExtractBoxService } from '@/modules/extract/box/service/type'
import { GetAllUseCase } from '@/modules/extract/box/use-cases/get-all-use-case'
import { IExtractBoxIntegration } from '@/modules/extract/box/integration/type'
import { ExtractBoxIntegration } from '@/modules/extract/box/integration'


export class ExtractBoxService implements IExtractBoxService {
    private extractBoxIntegration: IExtractBoxIntegration
    constructor() {
        this.extractBoxIntegration = new ExtractBoxIntegration
    }
    getAll(): Promise<BoxSchema[]> {
        const getAllBoxesUseCase = new GetAllUseCase(
            this.extractBoxIntegration,
        )
        return getAllBoxesUseCase.execute()
    }
}

export const extractBoxService = new ExtractBoxService()
