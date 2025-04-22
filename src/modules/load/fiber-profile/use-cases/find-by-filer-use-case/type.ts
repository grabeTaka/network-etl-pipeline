import { FiberProfile } from '@ozmap/ozmap-sdk'

export interface IFindByFilterUseCase {
    prepare(key: string, value: string | number)
    execute(): Promise<FiberProfile>
}
