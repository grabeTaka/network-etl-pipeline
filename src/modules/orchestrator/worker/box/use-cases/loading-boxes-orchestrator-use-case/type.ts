import { Job } from 'bullmq'

export interface ILoadingBoxesOrchestratorUseCase {
    prepare(job: Job): void
    execute(): Promise<void>
}
