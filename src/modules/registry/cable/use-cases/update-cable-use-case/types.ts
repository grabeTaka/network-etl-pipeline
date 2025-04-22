import { CableSchema } from '@/modules/registry/cable/schema'

export interface IUpdateCableUseCase {
    prepare: (
        id: string,
        value: Partial<CableSchema>,
        boxAId: string,
        boxBId: string,
    ) => void
    execute: () => Promise<void>
}
