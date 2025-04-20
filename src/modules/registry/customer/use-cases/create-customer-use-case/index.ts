import { customerModel } from '@/modules/registry/customer/model'
import { CustomerSchema } from '@/modules/registry/customer/schema'
import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { ICreateCustomerUseCase } from '@/modules/registry/customer/use-cases/create-customer-use-case/types'

export class CreateCustomerUseCase implements ICreateCustomerUseCase {
    customer: CustomerSchema
    externalLoadBoxId: string
    customerModel = customerModel

    prepare = (
        extractCustomer: ExtractCustomerSchema,
        externalLoadBoxId: string,
    ): void => {
        this.customer = {
            externalSourceId: extractCustomer.id,
            externalLoadId: externalLoadBoxId,
            name: extractCustomer.name,
            externalLoadBoxId: externalLoadBoxId,
        }
    }

    execute = async (): Promise<CustomerSchema> => {
        return await this.customerModel.create(this.customer)
    }
}
