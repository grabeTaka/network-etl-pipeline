import { BoxSchema } from '@/modules/extract/box/schema'
import { CableSchema } from '@/modules/extract/cable/schema'
import { CustomerSchema } from '@/modules/extract/customer/schema'

export type UnifiedBoxData = {
    box: BoxSchema
    customers: CustomerSchema[]
    cables: CableSchema[]
}

export type UnifyResult = {
    boxesEnriched: UnifiedBoxData[]
    unlinkedCustomers: CustomerSchema[]
    unlinkedCables: CableSchema[]
    unlinkedBoxes: BoxSchema[] 
}

export interface IUnifyDataFromExtractUseCase {
    execute: () => Promise<UnifyResult>
}
