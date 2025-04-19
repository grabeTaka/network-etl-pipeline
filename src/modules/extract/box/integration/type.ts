import { BoxSchema } from '@/modules/extract/box/schema'

export interface IExtractBoxIntegration {
    getAll(): Promise<BoxSchema[]>
}
