import mongoose from 'mongoose'
import { cableModel } from '@/modules/registry/cable/model'
import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'
import { IUpdateCableUseCase } from '@/modules/registry/cable/use-cases/update-cable-use-case/types'

export class UpdateCableUseCase implements IUpdateCableUseCase {
    id: mongoose.Types.ObjectId
    value: Partial<ExtractCableSchema>
    boxAId: string
    boxBId: string
    cableModel = cableModel

    prepare = (
        id: string,
        value: Partial<ExtractCableSchema>,
        boxAId: string,
        boxBId: string,
    ): void => {
        this.id = new mongoose.Types.ObjectId(id)
        this.value = value
        this.boxAId = boxAId
        this.boxBId = boxBId
    }

    execute = async (): Promise<void> => {
        await this.cableModel.updateOne({ _id: this.id }, { $set: this.value })
    }
}
