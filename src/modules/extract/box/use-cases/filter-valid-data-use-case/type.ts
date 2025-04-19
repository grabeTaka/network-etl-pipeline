import { BoxSchema } from '@/modules/extract/box/schema/index'

export interface IFilterValidDataUseCase {
    prepare(boxSchema: BoxSchema[])
    execute(): BoxSchema[]
}
