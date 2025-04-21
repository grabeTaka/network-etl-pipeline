import { CableType } from '@ozmap/ozmap-sdk'

export interface ILoadCableTypeIntegration {
    findByFilter(value: string | number, key: string): Promise<CableType>
    create(fiberProfileId: string): Promise<CableType>
}
