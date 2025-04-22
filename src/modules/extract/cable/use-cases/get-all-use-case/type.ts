import { CableSchema } from '@/modules/extract/cable/schema'

export interface IGetAllUseCase {
    execute(): Promise<CableSchema[]>
}
