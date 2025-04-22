import { Job } from 'bullmq'

export interface ILoadingCustomersOrchestratorUseCase {
    prepare(job: Job): void
    execute(): Promise<void>
}
