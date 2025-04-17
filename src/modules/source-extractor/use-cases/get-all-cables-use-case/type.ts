import { CableSchema } from '@/modules/source-extractor/schema'

export interface IGetAllCablesUseCase {
    execute(): Promise<CableSchema[]>
}
