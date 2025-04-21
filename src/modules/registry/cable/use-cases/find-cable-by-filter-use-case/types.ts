import { CableSchema } from '@/modules/registry/cable/schema/index'

export interface IFindCableByFilterUseCase {
    prepare: (value: string | number, key: string) => void
    execute: () => Promise<CableSchema[]>
}
