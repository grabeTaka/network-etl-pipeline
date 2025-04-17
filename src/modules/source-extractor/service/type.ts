import {
    BoxSchema,
    CableSchema,
    CustomerSchema,
    DropCableSchema,
} from '../schema'

export interface ISourceExtractorService {
    getAllBoxes(): Promise<BoxSchema[]>
    getAllCables(): Promise<CableSchema[]>
    getAllCustomers(): Promise<CustomerSchema[]>
    getAllDropCables(): Promise<DropCableSchema[]>
}
