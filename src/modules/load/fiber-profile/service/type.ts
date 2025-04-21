import { FiberProfile } from '@ozmap/ozmap-sdk'

export interface ILoadFiberProfileService {
    findOne(key: string, value: string | number): Promise<FiberProfile>
    create(fiberProfileId: string): Promise<FiberProfile>
}
