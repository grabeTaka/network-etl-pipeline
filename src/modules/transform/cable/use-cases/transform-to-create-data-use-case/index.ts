import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'
import { CreateCableDTO } from '@ozmap/ozmap-sdk'
import { ITransformToCreateDataUseCase } from '@/modules/transform/cable/use-cases/transform-to-create-data-use-case/type'

export class TransformToCreateDataUseCase
    implements ITransformToCreateDataUseCase
{
    private cable: ExtractCableSchema
    private externalLoadBoxAId: string
    private externalLoadBoxBId: string
    private cableTypeId: string

    prepare(
        externalLoadBoxAId: string,
        externalLoadBoxBId: string,
        cableTypeId: string,
        cable: ExtractCableSchema,
    ): void {
        this.cable = cable
        this.externalLoadBoxAId = externalLoadBoxAId
        this.externalLoadBoxBId = externalLoadBoxBId
        this.cableTypeId = cableTypeId
    }

    execute(): CreateCableDTO {
        const pathPoints = this.cable.path.map((path) => ({
            lat: Number(path.lat),
            lng: Number(path.lng),
        }))

        return {
            project: '',
            cableType: this.cableTypeId,
            hierarchyLevel: 0,
            implanted: false,
            poles: pathPoints,
            boxA: this.externalLoadBoxAId,
            boxB: this.externalLoadBoxBId,
            name: this.cable.name,
        }
    }
}
