import { CableType } from '@ozmap/ozmap-sdk'

export interface ICreateCableTypeUseCase {
    prepare(fiberProfileId: string)
    execute(): Promise<CableType>
}
