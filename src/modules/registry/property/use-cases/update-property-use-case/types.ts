import { PropertySchema } from '@/modules/registry/property/schema'

export interface IUpdatePropertyUseCase {
    prepare: (id: string, value: Partial<PropertySchema>, boxId: string) => void
    execute: () => Promise<void>
}
