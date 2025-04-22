import { IExtractCableIntegration } from '@/modules/extract/cable/integration/type'
import { CableSchema } from '@/modules/extract/cable/schema/index'
import { IGetAllUseCase } from '@/modules/extract/cable/use-cases/get-all-use-case/type'

export class GetAllUseCase implements IGetAllUseCase {
    private extractCableIntegratrion: IExtractCableIntegration

    constructor(extractCableIntegratrion: IExtractCableIntegration) {
        this.extractCableIntegratrion = extractCableIntegratrion
    }

    execute = async (): Promise<CableSchema[]> => {
        return await this.extractCableIntegratrion.getAll()
    }
}
