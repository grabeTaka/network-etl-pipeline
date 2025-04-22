import mongoose from 'mongoose'
import { boxModel } from '@/modules/registry/box/model'
import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { IUpdateBoxUseCase } from '@/modules/registry/box/use-cases/update-box-use-case/types'
import { coordinates } from '@ozmap/ozmap-sdk'

export class UpdateBoxUseCase implements IUpdateBoxUseCase {
    id: mongoose.Types.ObjectId
    value: Partial<ExtractBoxSchema>
    boxModel = boxModel

    prepare = (id: string, value: Partial<ExtractBoxSchema>): void => {
        this.id = new mongoose.Types.ObjectId(id)
        this.value = value
    }

    execute = async (): Promise<void> => {
        console.log(this.value)
        console.log(this.id)
        const data = {
            name: this.value.name,
            typeName: this.value.type,
            coordinates: [this.value.lat, this.value.lng],
        }
        await this.boxModel.updateOne({ _id: this.id }, { $set: data })
    }
}
