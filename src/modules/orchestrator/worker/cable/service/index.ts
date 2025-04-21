import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection/index'
import { ICableWorker } from '@/modules/orchestrator/worker/cable/service/type'
import { LoadingCablesOrchestratorUseCase } from '@/modules/orchestrator/worker/cable/use-cases/loading-cables-orchestrator-use-case'

export class CableWorker implements ICableWorker {
    constructor() {
        this.initWorker()
    }

    initWorker = () => {
        new Worker(
            'loading-cables-queue',
            async (job: Job) => {
                try {
                    console.log(
                        `Tentativa ${job.attemptsMade + 1} de ${job.opts.attempts} para cable ${job.data.cable.id}`,
                    )

                    /*const loadingCablesOrchestratorUseCase =
                        new LoadingCablesOrchestratorUseCase()
                    loadingCablesOrchestratorUseCase.prepare(job.data.cable)
                    await loadingCablesOrchestratorUseCase.execute()*/
                } catch (error) {
                    console.error(
                        'Erro ao buscar cables, reprocessando...',
                        error,
                    )
                    throw error
                }
            },
            { connection: redisConnection },
        )
    }
}
