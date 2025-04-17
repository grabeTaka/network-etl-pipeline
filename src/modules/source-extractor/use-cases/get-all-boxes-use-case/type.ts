import { BoxSchema } from '@/modules/source-extractor/schema'

export interface IGetAllBoxesUseCase {
    execute(): Promise<BoxSchema[]>
}
