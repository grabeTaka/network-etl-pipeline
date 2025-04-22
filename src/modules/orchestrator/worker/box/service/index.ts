import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection/index'
import { IBoxWorker } from '@/modules/orchestrator/worker/box/service/type'
import { LoadingBoxesOrchestratorUseCase } from '@/modules/orchestrator/worker/box/use-cases/loading-boxes-orchestrator-use-case'
import Bottleneck from 'bottleneck'

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
                        `Tentativa ${job.attemptsMade + 1} de ${job.opts.attempts} para box com id ${job.data.box.id}`,
                    )
                    const loadingBoxesOrchestratorUseCase =
                        new LoadingBoxesOrchestratorUseCase()
                    loadingBoxesOrchestratorUseCase.prepare(job.data.box)
                    await loadingBoxesOrchestratorUseCase.execute()
                } catch (error) {
                    if (error instanceof Bottleneck.BottleneckError) {
                        console.log('Rate limit atingido!')
                    }

                    console.error(
                        `Erro ao processar boxes, será reprocessado em segundos...`,
                    )
                    console.error('status:', error.status)
                    console.error('Motivo:', error.data)
                    throw error
                }
            },
            { connection: redisConnection },
        )
    }
}

//TODO não deve reprocessar caso o erro seja 4xx
