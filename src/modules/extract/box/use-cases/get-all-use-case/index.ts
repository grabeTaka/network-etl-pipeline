import { IExtractBoxIntegration } from '@/modules/extract/box/integration/type'
import { BoxSchema } from '@/modules/extract/box/schema/index'
import { IGetAllUseCase } from '@/modules/extract/box/use-cases/get-all-use-case/type'

export class GetAllUseCase implements IGetAllUseCase {
    private extractBoxIntegratrion: IExtractBoxIntegration

    constructor(extractBoxIntegratrion: IExtractBoxIntegration) {
        this.extractBoxIntegratrion = extractBoxIntegratrion
    }

    execute = async (): Promise<BoxSchema[]> => {
        return await this.extractBoxIntegratrion.getAll()
    }
}
