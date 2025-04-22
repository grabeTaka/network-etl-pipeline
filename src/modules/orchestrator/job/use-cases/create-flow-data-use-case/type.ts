import { BoxSchema } from '@/modules/extract/box/schema'
import { CableSchema } from '@/modules/extract/cable/schema'
import { CustomerSchema } from '@/modules/extract/customer/schema'

export interface ICreateFlowDataUseCase {
    prepare: (
        boxes: BoxSchema[],
        customers: CustomerSchema[],
        cables: CableSchema[],
    ) => void
    execute: () => Promise<void>
}
