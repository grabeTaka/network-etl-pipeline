import { UpdateBoxDTO } from '@ozmap/ozmap-sdk'

export interface ILoadUpdateBoxUseCase {
    prepare(data: UpdateBoxDTO, externalLoadId: string): void
    execute(): Promise<void>
}
