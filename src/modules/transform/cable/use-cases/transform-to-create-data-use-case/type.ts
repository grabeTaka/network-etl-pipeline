import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'
import { CreateCableDTO } from '@ozmap/ozmap-sdk'

export interface ITransformToCreateDataUseCase {
    prepare(
        externalLoadBoxAId: string,
        externalLoadBoxBId: string,
        cableTypeId: string,
        cable: ExtractCableSchema,
    ): void
    execute(): CreateCableDTO
}
