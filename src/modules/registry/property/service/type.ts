import { PropertySchema } from '@/modules/registry/property/schema'

export interface IRegistryCustomerService {
    create(
        property: PropertySchema,
        externalLoadBoxId: string,
    ): Promise<PropertySchema>
    findByFilter(value: string | number, key: string): Promise<PropertySchema[]>
    update(id: string, value: Partial<PropertySchema>)
}
