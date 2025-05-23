import { Box, CreateBoxDTO, UpdateBoxDTO } from '@ozmap/ozmap-sdk'

export interface ILoadBoxIntegration {
    create(box: CreateBoxDTO): Promise<Box>
    update(data: UpdateBoxDTO, id: string): Promise<void>
}
