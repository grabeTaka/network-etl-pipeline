import { Queue } from 'bullmq'
import { redisConnection } from '@/utils/redis-connection'
import { jobsDefaultOptions } from '@/utils/jobs-default-options'
import { hashGenerator } from '@/utils/hash-generator'

export class SourceExtractorBoxesQueue {
    private queue: Queue
    private jobId: string = hashGenerator('boxes')

    constructor() {
        this.queue = new Queue('source-extractor-boxes-queue', {
            connection: redisConnection,
        })
    }

    public async scheduleRecurringJob() {
        console.log('iniciando limpeza')
        await this.queue.clean(0, 1000, 'failed')
        await this.queue.clean(0, 1000, 'completed')
        await this.queue.clean(0, 1000, 'wait')
        await this.queue.clean(0, 1000, 'delayed')

        console.log('Adicionando job recorrente à fila...')
        this.queue.add('boxes-queue', {}, jobsDefaultOptions)
    }

    public async checkJobs() {
        const jobs = await this.queue.getJobs(['delayed', 'failed', 'wait'])
        console.log(
            jobs.map(async (job) => ({
                id: job.id,
                name: job.name,
                attemptsMade: job.attemptsMade,
            })),
        )
    }
}
