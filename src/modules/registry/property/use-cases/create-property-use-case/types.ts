import { PropertySchema } from '@/modules/registry/property/schema/index'

export interface ICreatePropertyUseCase {
    prepare: (
        property: PropertySchema,
        externalLoadBoxId: string,
        boxId: string,
    ) => void
    execute: () => Promise<PropertySchema>
}
