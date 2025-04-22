import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'
import { Job } from 'bullmq'

export interface ILoadingCablesOrchestratorUseCase {
    prepare(job: Job): void
    execute(): Promise<void>
}
