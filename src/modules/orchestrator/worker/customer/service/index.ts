import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection/index'
import { ICustomerWorker } from '@/modules/orchestrator/worker/customer/service/type'
import { LoadingBoxesOrchestratorUseCase } from '@/modules/orchestrator/worker/box/use-cases/loading-boxes-orchestrator-use-case'

export class CustomerWorker implements ICustomerWorker {
    constructor() {
        this.initWorker()
    }

    initWorker = () => {
        new Worker(
            'loading-customers-queue',
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
