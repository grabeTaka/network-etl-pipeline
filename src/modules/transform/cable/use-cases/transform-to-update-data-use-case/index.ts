import { CableSchema as ExtractCustomerSchema } from '@/modules/extract/cable/schema'
import { UpdateCableDTO } from '@ozmap/ozmap-sdk'
import { ITransformToUpdateDataUseCase } from '@/modules/transform/cable/use-cases/transform-to-update-data-use-case/type'

export class TransformToUpdateDataUseCase
    implements ITransformToUpdateDataUseCase
{
    private cable: ExtractCustomerSchema
    private externalLoadBoxAId: string
    private externalLoadBoxBId: string

    prepare(
        externalLoadBoxAId: string,
        externalLoadBoxBId: string,
        cable: ExtractCustomerSchema,
    ): void {
        this.cable = cable
        this.externalLoadBoxAId = externalLoadBoxAId
        this.externalLoadBoxBId = externalLoadBoxBId
    }

    execute(): UpdateCableDTO {
        const pathPoints = this.cable.path.map((path) => ({
            lat: Number(path.lat),
            lng: Number(path.lng),
        }))
        return {
            poles: pathPoints,
            boxA: this.externalLoadBoxAId,
            boxB: this.externalLoadBoxBId,
            name: this.cable.name,
        }
    }
}
