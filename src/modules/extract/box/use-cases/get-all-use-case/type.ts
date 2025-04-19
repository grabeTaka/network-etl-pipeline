import { BoxSchema } from '@/modules/extract/box/schema/index'

export interface IGetAllUseCase {
    execute(): Promise<BoxSchema[]>
}
