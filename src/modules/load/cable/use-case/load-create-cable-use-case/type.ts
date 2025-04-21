import { Cable, CreateCableDTO } from '@ozmap/ozmap-sdk'

export interface ILoadCreateCableUseCase {
    prepare(data: CreateCableDTO): void
    execute(): Promise<Cable>
}
