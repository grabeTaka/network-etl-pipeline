import { BoxSchema } from '@/modules/extract/box/schema'

export interface IExtractBoxService {
    getAll(): Promise<BoxSchema[]>
}
