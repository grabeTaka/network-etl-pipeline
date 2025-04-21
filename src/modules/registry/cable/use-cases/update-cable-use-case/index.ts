import mongoose from 'mongoose'
import { cableModel } from '@/modules/registry/cable/model'
import { CableSchema } from '@/modules/registry/cable/schema'
import { IUpdateCableUseCase } from '@/modules/registry/cable/use-cases/update-cable-use-case/types'

export class UpdateCableUseCase implements IUpdateCableUseCase {
    id: mongoose.Types.ObjectId
    value: Partial<CableSchema>
    boxAId: string
    boxBId: string
    cableModel = cableModel

    prepare = (
        id: string,
        value: Partial<CableSchema>,
        boxAId: string,
        boxBId: string,
    ): void => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            //TODO ADD WINSTON HERE
        }

        this.id = new mongoose.Types.ObjectId(id)
        this.value = value
        this.boxAId = boxAId
        this.boxBId = boxBId
    }

    execute = async (): Promise<void> => {
        this.value.boxConnected[0] = this.boxAId
        this.value.boxConnected[1] = this.boxBId
        await this.cableModel.updateOne({ _id: this.id }, { $set: this.value })
    }
}
