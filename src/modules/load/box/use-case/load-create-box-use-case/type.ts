import { Box, CreateBoxDTO } from '@ozmap/ozmap-sdk'

export interface ILoadCreateBoxUseCase {
    prepare(data: CreateBoxDTO): void
    execute(): Promise<Box>
}
