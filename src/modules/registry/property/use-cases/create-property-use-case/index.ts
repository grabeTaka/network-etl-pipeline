import { propertyModel } from '@/modules/registry/property/model'
import { PropertySchema } from '@/modules/registry/property/schema'
import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { ICreatePropertyUseCase } from '@/modules/registry/property/use-cases/create-property-use-case/types'

export class CreatePropertyUseCase implements ICreatePropertyUseCase {
    property: PropertySchema
    externalLoadBoxId: string
    propertyModel = propertyModel

    prepare = (
        extractProperty: ExtractCustomerSchema,
        externalLoadBoxId: string,
    ): void => {
        this.property = {
            externalSourceId: extractProperty.id,
            externalLoadId: externalLoadBoxId,
            name: extractProperty.name,
            externalLoadBoxId: externalLoadBoxId,
        }
    }

    execute = async (): Promise<PropertySchema> => {
        return await this.propertyModel.create(this.property)
    }
}
