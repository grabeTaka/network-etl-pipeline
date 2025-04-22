import { Box, CreateBoxDTO, UpdateBoxDTO } from '@ozmap/ozmap-sdk'

export interface ILoadBoxService {
    create(data: CreateBoxDTO): Promise<Box>
    update(data: UpdateBoxDTO, externalLoadId: string)
}
