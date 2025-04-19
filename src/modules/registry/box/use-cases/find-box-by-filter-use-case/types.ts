import { BoxSchema } from '@/modules/registry/box/schema/index'

export interface IFindBoxByFilterUseCase {
    prepare: (value: string | number, key: string) => void
    execute: () => Promise<BoxSchema[]>
}
