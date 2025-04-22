import { BoxSchema } from '@/modules/extract/box/schema'
import { CableSchema } from '@/modules/extract/cable/schema'
import { CustomerSchema } from '@/modules/extract/customer/schema'

export type UnifyResult = {
    boxes: BoxSchema[]
    customers: CustomerSchema[]
    cables: CableSchema[]
}

export interface IUnifyDataFromExtractUseCase {
    execute: () => Promise<UnifyResult>
}
