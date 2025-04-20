import mongoose from 'mongoose'
import { customerModel } from '@/modules/registry/customer/model'
import { CustomerSchema } from '@/modules/registry/customer/schema'
import { IUpdateCustomerUseCase } from '@/modules/registry/customer/use-cases/update-customer-use-case/types'

export class UpdateCustomerUseCase implements IUpdateCustomerUseCase {
    id: mongoose.Types.ObjectId
    value: Partial<CustomerSchema>
    customerModel = customerModel

    prepare = (id: string, value: Partial<CustomerSchema>): void => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            //TODO ADD WINSTON HERE
        }

        this.id = new mongoose.Types.ObjectId(id)
        this.value = value
    }

    execute = async (): Promise<void> => {
        await this.customerModel.updateOne(
            { _id: this.id },
            { $set: this.value },
        )
    }
}
