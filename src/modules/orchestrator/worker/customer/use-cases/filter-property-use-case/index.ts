import { IFilterPropertyUseCase } from './types'
import { PropertySchema as RegisteredPropertySchema } from '@/modules/registry/property/schema/index'
import { BoxSchema as RegisteredBoxSchema } from '@/modules/registry/box/schema/index'
import { CustomerSchema as ExtractedCustomerSchema } from '@/modules/extract/customer/schema/index'

export class FilterPropertyUseCase implements IFilterPropertyUseCase {
    registeredProperty: RegisteredPropertySchema | null
    registeredBox: RegisteredBoxSchema
    extractedProperty: ExtractedCustomerSchema

    prepare = (
        registeredProperty: RegisteredPropertySchema | null,
        extractedProperty: ExtractedCustomerSchema,
        registeredBox: RegisteredBoxSchema,
    ): void => {
        this.registeredProperty = registeredProperty
        this.extractedProperty = extractedProperty
        this.registeredBox = registeredBox
    }

    execute = (): { propertyNeedsUpdate: boolean } => {
        if (
            this.registeredProperty.boxId !== this.registeredBox._id ||
            this.registeredProperty.name !== this.extractedProperty.name ||
            this.registeredProperty.address !== this.extractedProperty.address
        )
            return { propertyNeedsUpdate: true }

        return { propertyNeedsUpdate: false }
    }
}
