import { DropCableSchema } from '@/modules/extract/drop-cable/schema'

export interface IExtractDropCableIntegration {
    getAll(): Promise<DropCableSchema[]>
}
