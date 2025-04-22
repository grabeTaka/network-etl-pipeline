import { PropertySchema } from '@/modules/registry/property/schema/index'

export interface IFindPropertyByFilterUseCase {
    prepare: (value: string | number, key: string) => void
    execute: () => Promise<PropertySchema[]>
}
