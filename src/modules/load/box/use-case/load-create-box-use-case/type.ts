import { Box } from "@ozmap/ozmap-sdk"

export interface ILoadCreateBoxUseCase {
    prepare(data: Box): void
    execute(): Promise<Box>
}
