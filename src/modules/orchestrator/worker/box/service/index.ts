import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection/index'
import { IBoxWorker } from '@/modules/orchestrator/worker/box/service/type'

export class BoxWorker implements IBoxWorker {

    constructor() {
        this.initWorker()
        this.initWorker2()
    }

    initWorker = () => {
        new Worker(
            'loading-boxes-queue',
            async (job: Job) => {
                try {
                    console.log( `Tentativa ${job.attemptsMade + 1} de ${job.opts.attempts} para boxes`)
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

    initWorker2 = () => {
        new Worker(
            'loading-customers-queue',
            async (job: Job) => {
                try {
                    console.log( `Tentativa ${job.attemptsMade + 1} de ${job.opts.attempts} para customers`)
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
