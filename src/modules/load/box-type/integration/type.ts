import { BoxType } from '@ozmap/ozmap-sdk'

export interface ILoadBoxTypeIntegration {
    findByFilter(value: string | number, key: string): Promise<BoxType>
    create(boxTypeCode: string): Promise<BoxType>
}
