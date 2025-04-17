import { Queue } from 'bullmq'
import { redisConnection } from '@/utils/redis-connection'
import { jobsCustomerDefaultOptions } from '@/utils/jobs-default-options'

export class SourceExtractorCablesQueue {
    private queue: Queue

    constructor() {
        this.queue = new Queue('source-extractor-cables-queue', {
            connection: redisConnection,
        })
    }

    public async addJobOnDemand() {
        console.log('Adicionando job recorrente à fila...')
        this.queue.add(
            'cables-queue',
            {},
            { jobId: 'cables-on-demand-job', ...jobsCustomerDefaultOptions },
        )
    }
}
