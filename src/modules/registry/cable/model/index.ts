import {
    getModelForClass,
    modelOptions,
    mongoose,
    Prop,
} from '@typegoose/typegoose'
import ObjectId = mongoose.Types.ObjectId
import { CableSchema } from '@/modules/registry/cable/schema'

@modelOptions({ schemaOptions: { validateBeforeSave: true } })
export class Cable implements CableSchema {
    @Prop({ required: true, default: () => new ObjectId().toString() })
    _id: string

    @Prop({ required: true })
    name!: string

    @Prop({ required: true })
    externalSourceId!: number

    @Prop({ required: true, default: () => new ObjectId().toString() })
    externalLoadId!: string

    @Prop({ required: true })
    path!: Array<{ lat: number; lng: number }>

    @Prop({ required: true, type: () => [Number] })
    coordinates: [number, number]
}

export const cableModel = getModelForClass(Cable)
