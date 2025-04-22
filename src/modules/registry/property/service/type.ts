import { PropertySchema } from '@/modules/registry/property/schema'

export interface IRegistryPropertyService {
    create(
        property: PropertySchema,
        externalLoadProteryId: string | null,
        boxId: string,
    ): Promise<PropertySchema>
    findByFilter(value: string | number, key: string): Promise<PropertySchema[]>
    update(id: string, value: Partial<PropertySchema>, boxId: string)
}
