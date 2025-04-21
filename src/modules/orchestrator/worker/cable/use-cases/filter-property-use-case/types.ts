import { CableSchema as RegistryCableSchema } from '@/modules/registry/cable/schema/index'
import { BoxSchema as RegistryBoxSchema } from '@/modules/registry/box/schema/index'
import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema/index'

export interface IFilterCableUseCase {
    prepare: (
        registryCable: RegistryCableSchema,
        registeredBoxA: RegistryBoxSchema,
        registeredBoxB: RegistryBoxSchema,
        extractCable: ExtractCableSchema,
    ) => void
    execute: () => { cableNeedsUpdate: boolean }
}
