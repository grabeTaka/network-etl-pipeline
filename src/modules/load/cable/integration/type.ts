import { Cable, CreateCableDTO, UpdateCableDTO } from '@ozmap/ozmap-sdk'

export interface ILoadCableIntegration {
    findByFilter(value: string | number, key: string): Promise<Cable>
    create(cable: CreateCableDTO): Promise<Cable>
    update(data: UpdateCableDTO, id: string): Promise<void>
}
