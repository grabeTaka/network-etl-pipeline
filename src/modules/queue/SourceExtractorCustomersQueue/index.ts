import { Queue } from 'bullmq'
import { redisConnection } from '@/utils/redis-connection'
import { jobsCustomerDefaultOptions } from '@/utils/jobs-default-options'

export class SourceExtractorCustomersQueue {
    private queue: Queue

    constructor() {
        this.queue = new Queue('source-extractor-customers-queue', {
            connection: redisConnection,
        })
    }

    public async addJobOnDemand() {
        console.log('Adicionando job recorrente à fila...')
        this.queue.add(
            'customers-queue',
            {},
            { jobId: 'customers-on-demand-job', ...jobsCustomerDefaultOptions },
        )
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
