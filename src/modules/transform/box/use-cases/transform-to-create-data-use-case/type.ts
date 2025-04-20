import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { CreateBoxDTO } from '@ozmap/ozmap-sdk'

export interface ITransformToCreateDataUseCase {
    prepare(boxTypeId: string, box: ExtractBoxSchema): void
    execute(): CreateBoxDTO
}
