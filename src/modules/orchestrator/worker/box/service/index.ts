import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection/index'
import { IBoxWorker } from '@/modules/orchestrator/worker/box/service/type'
import { LoadingBoxesOrchestratorUseCase } from '@/modules/orchestrator/worker/box/use-cases/loading-boxes-orchestrator-use-case'

export class BoxWorker implements IBoxWorker {
    constructor() {
        this.initWorker()
    }

    initWorker = () => {
        new Worker(
            'loading-boxes-queue',
            async (job: Job) => {
                try {
                    console.log(
                        `Tentativa ${job.attemptsMade + 1} de ${job.opts.attempts} para box ${job.data.box.id}`,
                    )
                    const loadingBOxesOrchestratorUseCase =
                        new LoadingBoxesOrchestratorUseCase()
                    loadingBOxesOrchestratorUseCase.prepare(job.data.box)
                    await loadingBOxesOrchestratorUseCase.execute()
                } catch (error) {
                    console.error(
                        'Erro ao buscar boxes, reprocessando...',
                        error,
                    )
                    throw error
                }
            },
            { connection: redisConnection },
        )
    }
}
