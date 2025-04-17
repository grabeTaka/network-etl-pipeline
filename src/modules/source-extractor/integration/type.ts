import {
    BoxSchema,
    CableSchema,
    CustomerSchema,
    DropCableSchema,
} from '../schema'

export interface ISourceExtractorIntegration {
    getBoxes(): Promise<BoxSchema[]>
    getCables(): Promise<CableSchema[]>
    getCustomers(): Promise<CustomerSchema[]>
    getDropCables(): Promise<DropCableSchema[]>
}
