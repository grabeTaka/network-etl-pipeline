import {
    BoxSchema,
    CableSchema,
    CustomerSchema,
    DropCableSchema,
} from '../schema'

export interface ISourceExtractor {
    getBoxes(): Promise<BoxSchema[]>
    getCables(): Promise<CableSchema[]>
    getCustomers(): Promise<CustomerSchema[]>
    getDropCacles(): Promise<DropCableSchema[]>
}
