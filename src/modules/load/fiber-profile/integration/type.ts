import { FiberProfile } from '@ozmap/ozmap-sdk'

export interface ILoadFiberProfileIntegration {
    findByFilter(value: string | number, key: string): Promise<FiberProfile>
    create(): Promise<FiberProfile>
}
