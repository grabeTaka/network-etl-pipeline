import { getModelForClass, modelOptions, mongoose, Prop } from "@typegoose/typegoose"
import ObjectId = mongoose.Types.ObjectId
import { BoxSchema } from "@/modules/registry/box/schema/index"


@modelOptions({ schemaOptions: { validateBeforeSave: false } })
export class Box implements BoxSchema {
    @Prop({ required: true, default: () => new ObjectId().toString() })
    _id: string
    
    @Prop({ required: true })
    name!: string

    @Prop({ required: true })
    external_source_id!: number

    @Prop({ required: true, default: () => new ObjectId().toString() })
    external_load_id!: string

    @Prop({ required: true })
    email!: string

    @Prop({ required: true })
    type_name: string

    @Prop({ required: true, type: () => [Number] })
    coordinates: [number, number]
}

export const boxModel = getModelForClass(Box);