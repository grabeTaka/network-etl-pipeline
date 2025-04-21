import { CableType } from '@ozmap/ozmap-sdk'

export interface IFindByFilterUseCase {
    prepare(key: string, value: string | number)
    execute(): Promise<CableType>
}
