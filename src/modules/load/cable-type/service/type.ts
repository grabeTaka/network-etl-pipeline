import { CableType } from '@ozmap/ozmap-sdk'

export interface ILoadCableTypeService {
    findOne(key: string, value: string | number): Promise<CableType>
    create(fiberProfileId: string): Promise<CableType>
}
