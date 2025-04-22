import { IExtractDropCableIntegration } from '@/modules/extract/drop-cable/integration/type'
import { DropCableSchema } from '@/modules/extract/drop-cable/schema/index'
import { IGetAllUseCase } from '@/modules/extract/drop-cable/use-cases/get-all-use-case/type'

export class GetAllUseCase implements IGetAllUseCase {
    private extractDropCableIntegratrion: IExtractDropCableIntegration

    constructor(extractDropCableIntegratrion: IExtractDropCableIntegration) {
        this.extractDropCableIntegratrion = extractDropCableIntegratrion
    }

    execute = async (): Promise<DropCableSchema[]> => {
        return await this.extractDropCableIntegratrion.getAll()
    }
}
