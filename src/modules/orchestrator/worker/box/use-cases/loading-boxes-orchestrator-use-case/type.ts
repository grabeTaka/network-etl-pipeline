import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'

export interface ILoadingBoxesOrchestratorUseCase {
    prepare(data: ExtractBoxSchema): void
    execute(): Promise<void>
}
