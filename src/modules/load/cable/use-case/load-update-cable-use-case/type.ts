import { UpdateCableDTO } from '@ozmap/ozmap-sdk'

export interface ILoadUpdateCableUseCase {
    prepare(data: UpdateCableDTO, externalLoadId: string): void
    execute(): Promise<void>
}
