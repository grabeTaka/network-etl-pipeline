import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'

export interface ILoadingCablesOrchestratorUseCase {
    prepare(data: ExtractCableSchema): void
    execute(): Promise<void>
}
