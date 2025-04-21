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
                    const loadingBoxesOrchestratorUseCase =
                        new LoadingBoxesOrchestratorUseCase()
                    loadingBoxesOrchestratorUseCase.prepare(job.data.box)
                    await loadingBoxesOrchestratorUseCase.execute()
                    console.log('fim box')
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

//TODO não deve reprocessar caso o erro seja 4xx
//TODO iremos adicionar mais um worker que irá sincronizar os boxes que não possuem cliente associados esse poderá executar ações concorrentes
