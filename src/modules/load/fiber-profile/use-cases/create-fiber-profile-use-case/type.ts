import { FiberProfile } from '@ozmap/ozmap-sdk'

export interface ICreateFiberProfileUseCase {
    execute(): Promise<FiberProfile>
}
