import { CableSchema } from '@/modules/extract/cable/schema'

export interface IExtractCableIntegration {
    getAll(): Promise<CableSchema[]>
    findOne(id: number): Promise<CableSchema>
}
