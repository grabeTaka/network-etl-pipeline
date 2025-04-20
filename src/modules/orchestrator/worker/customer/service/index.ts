import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection/index'
import { ICustomerWorker } from '@/modules/orchestrator/worker/customer/service/type'
import { LoadingCustomersOrchestratorUseCase } from '@/modules/orchestrator/worker/customer/use-cases/loading-customers-orchestrator-use-case'

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
                        `Tentativa ${job.attemptsMade + 1} de ${job.opts.attempts} para customer ${job.data.customer.id}`,
                    )
                    const loadingCustomersOrchestratorUseCase =
                        new LoadingCustomersOrchestratorUseCase()
                    loadingCustomersOrchestratorUseCase.prepare(
                        job.data.customer,
                    )
                    await loadingCustomersOrchestratorUseCase.execute()
                } catch (error) {
                    console.error(
                        'Erro ao buscar customers, reprocessando...',
                        error,
                    )
                    throw error
                }
            },
            { connection: redisConnection },
        )
    }
}
