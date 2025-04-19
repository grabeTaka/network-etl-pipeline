import { Box } from '@ozmap/ozmap-sdk'

export interface ILoadBoxIntegration {
    findByFilter(value: string | number, key: string): Promise<Box>
    create(box: Box): Promise<Box>
}
