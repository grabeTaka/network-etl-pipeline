import { BoxSchema as ExtractedBoxSchema } from '@/modules/extract/box/schema'
import { CreateBoxDTO, UpdateBoxDTO } from '@ozmap/ozmap-sdk'

export interface ITransformBoxService {
    transformToCreate(
        boxTypeId: string,
        extractedBox: ExtractedBoxSchema,
    ): CreateBoxDTO
    transformToUpdate(
        boxTypeId: string | null,
        extractedBox: ExtractedBoxSchema,
    ): UpdateBoxDTO
}
