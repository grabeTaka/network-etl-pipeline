import { DropCableSchema } from '@/modules/extract/drop-cable/schema'

export interface IGetAllUseCase {
    execute(): Promise<DropCableSchema[]>
}
