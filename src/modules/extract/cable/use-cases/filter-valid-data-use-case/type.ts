import { CableSchema } from '@/modules/extract/cable/schema'

export interface IFilterValidDataUseCase {
    prepare(boxSchema: CableSchema[])
    execute(): CableSchema[]
}
