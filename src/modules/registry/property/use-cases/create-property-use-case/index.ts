import { propertyModel } from '@/modules/registry/property/model'
import { PropertySchema } from '@/modules/registry/property/schema'
import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { ICreatePropertyUseCase } from '@/modules/registry/property/use-cases/create-property-use-case/types'

export class CreatePropertyUseCase implements ICreatePropertyUseCase {
    property: PropertySchema
    externalLoadPropertyId: string
    externalLoadCustomerId: string
    propertyModel = propertyModel

    prepare = (
        extractProperty: ExtractCustomerSchema,
        externalLoadPropertyId: string,
        boxId: string,
    ): void => {
        this.property = {
            externalSourceId: extractProperty.id,
            externalLoadId: externalLoadPropertyId,
            name: extractProperty.name,
            boxId: boxId,
            code: extractProperty.code,
            address: extractProperty.address,
        }
    }

    execute = async (): Promise<PropertySchema> => {
        return await this.propertyModel.create(this.property)
    }
}
