import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection/index'
import { IBoxWorker } from '@/modules/orchestrator/worker/box/service/type'
import { LoadingBoxesOrchestratorUseCase } from '@/modules/orchestrator/worker/box/use-cases/loading-boxes-orchestrator-use-case'
import Bottleneck from 'bottleneck'
import { logger } from '@/modules/shared/utils/logger'

export class BoxWorker implements IBoxWorker {
    constructor() {
        this.initWorker()
    }

    initWorker = () => {
        new Worker(
            'loading-boxes-queue',
            async (job: Job) => {
                try {
                    const loadingBoxesOrchestratorUseCase =
                        new LoadingBoxesOrchestratorUseCase()
                    loadingBoxesOrchestratorUseCase.prepare(job)
                    await loadingBoxesOrchestratorUseCase.execute()
                } catch (error) {
                    if (error instanceof Bottleneck.BottleneckError) {
                        logger.warn(
                            `[BoxWorker] Rate limit reached for box with ID: ${job.data.box.id}`,
                        )
                    }

                    logger.error(
                        `[BoxWorker] Error processing box with ID: ${job.data.box.id}. Will be retried..., description: ${error.message}`,
                    )

                    throw error
                }
            },
            { connection: redisConnection },
        )
    }
}
