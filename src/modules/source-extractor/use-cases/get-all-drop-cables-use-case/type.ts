import { DropCableSchema } from '@/modules/source-extractor/schema'

export interface IGetAllDropCablesUseCase {
    execute(): Promise<DropCableSchema[]>
}
