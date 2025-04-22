import { BoxSchema } from '@/modules/registry/box/schema'

export interface IUpdateBoxUseCase {
    prepare: (id: string, value: Partial<BoxSchema>) => void
    execute: () => Promise<void>
}
