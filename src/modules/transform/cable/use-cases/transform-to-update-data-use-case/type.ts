import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'
import { UpdateCableDTO } from '@ozmap/ozmap-sdk'

export interface ITransformToUpdateDataUseCase {
    prepare(
        externalLoadBoxAId: string,
        externalLoadBoxBId: string,
        cable: ExtractCableSchema,
    ): void
    execute(): UpdateCableDTO
}
