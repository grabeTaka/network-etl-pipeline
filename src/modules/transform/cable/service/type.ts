import { CableSchema as ExtractedCableSchema } from '@/modules/extract/cable/schema'
import { CreateCableDTO, UpdateCableDTO } from '@ozmap/ozmap-sdk'

export interface ITransformCableService {
    transformToCreate(
        externaLoadBoxAId: string,
        externaLoadBoxBId: string,
        cableTypeId: string,
        extractedCable: ExtractedCableSchema,
    ): CreateCableDTO
    transformToUpdate(
        externaLoadBoxAId: string,
        externaLoadBoxBId: string,
        extractedCable: ExtractedCableSchema,
    ): UpdateCableDTO
}
