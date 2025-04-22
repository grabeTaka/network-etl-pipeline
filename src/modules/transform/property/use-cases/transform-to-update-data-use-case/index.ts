import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { UpdatePropertyDTO } from '@ozmap/ozmap-sdk'
import { ITransformToUpdateDataUseCase } from '@/modules/transform/property/use-cases/transform-to-update-data-use-case/type'

export class TransformToUpdateDataUseCase
    implements ITransformToUpdateDataUseCase
{
    private externalLoadBoxId: string
    private customer: ExtractCustomerSchema

    prepare(externalLoadBoxId: string, customer: ExtractCustomerSchema): void {
        this.customer = customer
        this.externalLoadBoxId = externalLoadBoxId
    }

    execute(): UpdatePropertyDTO {
        return {
            name: `${this.customer.code} - ${this.customer.name}`,
            box: this.externalLoadBoxId,
            address: this.customer.address,
        }
    }
}
