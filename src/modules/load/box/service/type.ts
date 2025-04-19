import { Box } from '@ozmap/ozmap-sdk'

export interface ILoadBoxService {
    create(data: Box): Promise<Box>
}
