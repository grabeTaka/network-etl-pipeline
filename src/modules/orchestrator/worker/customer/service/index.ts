import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection/index'
import { ICustomerWorker } from '@/modules/orchestrator/worker/customer/service/type'
import { LoadingCustomersOrchestratorUseCase } from '@/modules/orchestrator/worker/customer/use-cases/loading-customers-orchestrator-use-case'
import Bottleneck from 'bottleneck'
import { logger } from '@/modules/shared/utils/logger'

export class CustomerWorker implements ICustomerWorker {
    constructor() {
        this.initWorker()
    }

    initWorker = () => {
        new Worker(
            'loading-customers-queue',
            async (job: Job) => {
                try {
                    const loadingCustomersOrchestratorUseCase =
                        new LoadingCustomersOrchestratorUseCase()
                    loadingCustomersOrchestratorUseCase.prepare(job)
                    await loadingCustomersOrchestratorUseCase.execute()
                } catch (error) {
                    if (error instanceof Bottleneck.BottleneckError) {
                        logger.error(
                            `[PropertyWorker] Rate limit reached property property with ID: ${job.data.property.id}`,
                        )
                        throw error
                    }
                    logger.error(
                        `[PropertyWorker] Error processing property with ID: ${job.data.property.id}. Will be retried...`,
                    )

                    throw error
                }
            },
            { connection: redisConnection },
        )
    }
}
