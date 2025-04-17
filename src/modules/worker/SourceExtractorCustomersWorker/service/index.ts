import { Worker, Job } from 'bullmq'
import { redisConnection } from '@/utils/redis-connection/index'
import { ISourceExtractorService } from '@/modules/source-extractor/service/type'
import { sourceExtractorService } from '@/modules/source-extractor/service'

export class SourceExtractorCustomersWorker {
    private sourceExtractorService: ISourceExtractorService

    constructor() {
        this.sourceExtractorService = sourceExtractorService
        this.initWorker()
    }

    initWorker = () => {
        new Worker(
            'source-extractor-customers-queue',
            async (job: Job) => {
                try {
                    console.log(
                        `Tentativa ${job.attemptsMade + 1} de ${job.opts.attempts} para customers`,
                    )

                    const results =
                        await this.sourceExtractorService.getAllCustomers()
                    //console.log(results)
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
