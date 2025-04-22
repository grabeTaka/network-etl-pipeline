import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { UpdateBoxDTO } from '@ozmap/ozmap-sdk'
import { ITransformToUpdateDataUseCase } from '@/modules/transform/box/use-cases/transform-to-update-data-use-case/type'

export class TransformToUpdateDataUseCase
    implements ITransformToUpdateDataUseCase
{
    private boxTypeId: string | null
    private box: ExtractBoxSchema

    prepare(boxTypeId: string | null, box: ExtractBoxSchema): void {
        this.box = box
        this.boxTypeId = boxTypeId
    }

    execute(): UpdateBoxDTO {
        if (!this.boxTypeId) {
            return {
                coords: [this.box.lat, this.box.lng],
                hierarchyLevel: 0,
                implanted: false,
                name: this.box.name,
            }
        }

        return {
            coords: [this.box.lat, this.box.lng],
            hierarchyLevel: 0,
            boxType: this.boxTypeId,
            implanted: false,
            name: this.box.name,
        }
    }
}
