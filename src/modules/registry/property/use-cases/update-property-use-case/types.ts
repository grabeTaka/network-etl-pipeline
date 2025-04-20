import { PropertySchema } from '@/modules/registry/property/schema'

export interface IUpdatePropertyUseCase {
    prepare: (id: string, value: Partial<PropertySchema>) => void
    execute: () => Promise<void>
}
