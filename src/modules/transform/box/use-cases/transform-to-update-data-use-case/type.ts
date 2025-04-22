import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { UpdateBoxDTO } from '@ozmap/ozmap-sdk'

export interface ITransformToUpdateDataUseCase {
    prepare(boxTypeId: string, box: ExtractBoxSchema): void
    execute(): UpdateBoxDTO
}
