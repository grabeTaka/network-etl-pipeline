import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { BoxType, CreateBoxDTO } from '@ozmap/ozmap-sdk'
import { ITransformToCreateDataUseCase } from '@/modules/transform/box/use-cases/transform-to-create-data-use-case/type'

export class TransformToCreateDataUseCase
    implements ITransformToCreateDataUseCase
{
    private boxTypeId: string
    private box: ExtractBoxSchema
    private projectId: string

    prepare(boxTypeId: string, box: ExtractBoxSchema): void {
        this.box = box
        this.boxTypeId = boxTypeId
    }

    execute(): CreateBoxDTO {
        return {
            project: '',
            coords: [this.box.lat, this.box.lng],
            hierarchyLevel: 0,
            boxType: this.boxTypeId,
            implanted: false,
            name: this.box.name,
        }
    }
}
