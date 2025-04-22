import { CableSchema } from '@/modules/extract/cable/schema'

export interface IExtractCableService {
    getAll(): Promise<CableSchema[]>
}
