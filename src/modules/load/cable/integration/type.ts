import { Cable, CreateCableDTO, UpdateCableDTO } from '@ozmap/ozmap-sdk'

export interface ILoadCableIntegration {
    create(cable: CreateCableDTO): Promise<Cable>
    update(data: UpdateCableDTO, id: string): Promise<void>
}
