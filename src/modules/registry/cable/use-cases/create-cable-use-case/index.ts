import { cableModel } from '@/modules/registry/cable/model'
import { CableSchema } from '@/modules/registry/cable/schema'
import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'
import { ICreateCableUseCase } from '@/modules/registry/cable/use-cases/create-cable-use-case/types'

export class CreateCableUseCase implements ICreateCableUseCase {
    cable: CableSchema
    externalLoadCableId: string
    externalLoadCustomerId: string
    cableModel = cableModel

    prepare = (
        extractCable: ExtractCableSchema,
        externalLoadCableId: string,
        boxAId: string,
        boxBId: string,
    ): void => {
        this.cable = {
            externalSourceId: extractCable.id,
            externalLoadId: externalLoadCableId,
            name: extractCable.name,
            path: extractCable.path,
            boxConnected: [boxAId, boxBId],
        }
    }

    execute = async (): Promise<CableSchema> => {
        return await this.cableModel.create(this.cable)
    }
}
