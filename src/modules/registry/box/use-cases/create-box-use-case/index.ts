import { boxModel } from '@/modules/registry/box/model'
import { BoxSchema } from '@/modules/registry/box/schema'
import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { ICreateBoxUseCase } from '@/modules/registry/box/use-cases/create-box-use-case/types'

export class CreateBoxUseCase implements ICreateBoxUseCase {
    box: BoxSchema
    externalLoadBoxId: string
    boxModel = boxModel

    prepare = (box: ExtractBoxSchema, externalLoadBoxId: string): void => {
        this.box = {
            externalSourceId: box.id,
            externalLoadId: externalLoadBoxId,
            name: box.name,
            typeName: box.type,
            coordinates: [box.lat, box.lng],
        }
    }

    execute = async (): Promise<BoxSchema> => {
        return await this.boxModel.create(this.box)
    }
}
