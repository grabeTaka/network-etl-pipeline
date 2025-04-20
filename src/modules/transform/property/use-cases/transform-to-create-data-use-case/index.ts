import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { CreatePropertyDTO } from '@ozmap/ozmap-sdk'
import { ITransformToCreateDataUseCase } from '@/modules/transform/property/use-cases/transform-to-create-data-use-case/type'

export class TransformToCreateDataUseCase
    implements ITransformToCreateDataUseCase
{
    private customer: ExtractCustomerSchema
    private externalLoadBoxId: string

    prepare(externalLoadBoxId: string, customer: ExtractCustomerSchema): void {
        this.customer = customer
        this.externalLoadBoxId = externalLoadBoxId
    }

    execute(): CreatePropertyDTO {
        return {
            name: `${this.customer.code} - ${this.customer.name}`,
            box: this.externalLoadBoxId,
            address: this.customer.address,
            project: '',
        }
    }
}
