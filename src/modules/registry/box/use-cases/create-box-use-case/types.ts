import { BoxSchema } from '@/modules/registry/box/schema/index'

export interface ICreateBoxUseCase {
    prepare: (box: BoxSchema) => void
    execute: () => Promise<BoxSchema>
}
