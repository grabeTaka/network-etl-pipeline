import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/utils/redis-connection/index'
import { ISourceExtractorService } from '@/modules/source-extractor/service/type'
import { sourceExtractorService } from '@/modules/source-extractor/service'

export class SourceExtractorDropCablesWorker {
    private sourceExtractorService: ISourceExtractorService

    constructor() {
        this.sourceExtractorService = sourceExtractorService
        this.initWorker()
    }

    initWorker = () => {
        new Worker(
            'source-extractor-drop-cables-queue',
            async (job: Job) => {
                try {
                    console.log(
                        `Tentativa ${job.attemptsMade + 1} de ${job.opts.attempts} para drop cables`,
                    )

                    const results =
                        await this.sourceExtractorService.getAllDropCables()
                    //console.log(results)
                } catch (error) {
                    console.error(
                        'Erro ao buscar drop cables, reprocessando...',
                        error,
                    )
                    throw error
                }
            },
            { connection: redisConnection },
        )
    }
}
