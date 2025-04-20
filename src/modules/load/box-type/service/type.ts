import { BoxType } from '@ozmap/ozmap-sdk'

export interface ILoadBoxTypeService {
    createOrFindOne(key: string, value: string | number): Promise<BoxType>
}
