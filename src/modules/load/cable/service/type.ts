import { Cable, CreateCableDTO, UpdateCableDTO } from '@ozmap/ozmap-sdk'

export interface ILoadCableService {
    create(data: CreateCableDTO): Promise<Cable>
    update(data: UpdateCableDTO, externalLoadId: string)
}
