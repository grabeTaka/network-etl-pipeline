import { CableSchema } from '@/modules/registry/cable/schema/index'

export interface ICreateCableUseCase {
    prepare: (
        cable: CableSchema,
        externalLoadBoxId: string,
        boxAId: string,
        boxBId: string,
    ) => void
    execute: () => Promise<CableSchema>
}
