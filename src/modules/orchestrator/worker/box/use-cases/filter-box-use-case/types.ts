import { BoxSchema as RegistryBoxSchema } from '@/modules/registry/box/schema/index'
import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema/index'

export interface IFilterBoxUseCase {
    prepare: (
        registryBox: RegistryBoxSchema,
        extractBox: ExtractBoxSchema,
    ) => void
    execute: () => boolean
}
