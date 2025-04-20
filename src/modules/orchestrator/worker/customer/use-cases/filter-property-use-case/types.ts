import { PropertySchema as RegistryPropertySchema } from '@/modules/registry/property/schema/index'
import { BoxSchema as RegistryBoxSchema } from '@/modules/registry/box/schema/index'
import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema/index'

export interface IFilterPropertyUseCase {
    prepare: (
        registryProperty: RegistryPropertySchema,
        registeredBox: RegistryBoxSchema,
        extractCustomer: ExtractCustomerSchema,
    ) => void
    execute: () => { propertyNeedsUpdate: boolean }
}
