import {
    getModelForClass,
    modelOptions,
    mongoose,
    Prop,
} from '@typegoose/typegoose'
import ObjectId = mongoose.Types.ObjectId
import { PropertySchema } from '@/modules/registry/property/schema'

@modelOptions({ schemaOptions: { validateBeforeSave: true } })
export class Property implements PropertySchema {
    @Prop({ required: true, default: () => new ObjectId().toString() })
    _id: string

    @Prop({ required: true })
    name!: string

    @Prop({ required: true })
    code!: string

    @Prop({ required: true })
    address!: string

    @Prop({ required: true })
    externalSourceId!: number

    @Prop({ required: true, default: () => new ObjectId().toString() })
    externalLoadId!: string

    @Prop({ required: false, default: () => new ObjectId().toString() })
    boxId!: string
}

export const propertyModel = getModelForClass(Property)
