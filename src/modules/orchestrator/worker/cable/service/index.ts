import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection/index'
import { ICableWorker } from '@/modules/orchestrator/worker/cable/service/type'
import { LoadingCablesOrchestratorUseCase } from '@/modules/orchestrator/worker/cable/use-cases/loading-cables-orchestrator-use-case'
import Bottleneck from 'bottleneck'
import { logger } from '@/modules/shared/utils/logger'

export class CableWorker implements ICableWorker {
    constructor() {
        this.initWorker()
    }

    initWorker = () => {
        new Worker(
            'loading-cables-queue',
            async (job: Job) => {
                try {
                    const loadingCablesOrchestratorUseCase =
                        new LoadingCablesOrchestratorUseCase()
                    loadingCablesOrchestratorUseCase.prepare(job)
                    await loadingCablesOrchestratorUseCase.execute()
                } catch (error) {
                    if (error instanceof Bottleneck.BottleneckError) {
                        logger.error(
                            `[CableWorker] Rate limit reached cable cable with ID: ${job.data.cable.id}`,
                        )
                        throw error
                    }

                    logger.error(
                        `[CableWorker] Error processing cable with ID: ${job.data.cable.id}. Will be retried..., desacription: ${error.message}`,
                    )

                    throw error
                }
            },
            { connection: redisConnection },
        )
    }
}
