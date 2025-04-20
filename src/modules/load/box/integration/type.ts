import { Box, CreateBoxDTO, UpdateBoxDTO } from '@ozmap/ozmap-sdk'

export interface ILoadBoxIntegration {
    findByFilter(value: string | number, key: string): Promise<Box>
    create(box: CreateBoxDTO): Promise<Box>
    update(data: UpdateBoxDTO, id: string): Promise<void>
}
