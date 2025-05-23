import {
    getModelForClass,
    modelOptions,
    mongoose,
    Prop,
} from '@typegoose/typegoose'
import ObjectId = mongoose.Types.ObjectId
import { BoxSchema } from '@/modules/registry/box/schema/index'

@modelOptions({ schemaOptions: { validateBeforeSave: true } })
export class Box implements BoxSchema {
    @Prop({ required: true, default: () => new ObjectId().toString() })
    _id: string

    @Prop({ required: true })
    name!: string

    @Prop({ required: true })
    externalSourceId!: number

    @Prop({ required: true, default: () => new ObjectId().toString() })
    externalLoadId!: string

    @Prop({ required: true })
    typeName: string

    @Prop({ required: true, type: () => [Number] })
    coordinates: [number, number]
}

export const boxModel = getModelForClass(Box)
