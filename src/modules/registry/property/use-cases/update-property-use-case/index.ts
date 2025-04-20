import mongoose from 'mongoose'
import { propertyModel } from '@/modules/registry/property/model'
import { PropertySchema } from '@/modules/registry/property/schema'
import { IUpdatePropertyUseCase } from '@/modules/registry/property/use-cases/update-property-use-case/types'

export class UpdatePropertyUseCase implements IUpdatePropertyUseCase {
    id: mongoose.Types.ObjectId
    value: Partial<PropertySchema>
    boxId: string
    propertyModel = propertyModel

    prepare = (
        id: string,
        value: Partial<PropertySchema>,
        boxId: string,
    ): void => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            //TODO ADD WINSTON HERE
        }

        this.id = new mongoose.Types.ObjectId(id)
        this.value = value
        this.boxId = boxId
    }

    execute = async (): Promise<void> => {
        this.value.boxId = this.boxId
        await this.propertyModel.updateOne(
            { _id: this.id },
            { $set: this.value },
        )
    }
}
