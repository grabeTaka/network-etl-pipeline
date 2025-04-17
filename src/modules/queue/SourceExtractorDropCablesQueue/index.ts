import { Queue } from 'bullmq'
import { redisConnection } from '@/utils/redis-connection'
import { jobsCustomerDefaultOptions } from '@/utils/jobs-default-options'

export class SourceExtractorDropCablesQueue {
    private queue: Queue

    constructor() {
        this.queue = new Queue('source-extractor-drop-cables-queue', {
            connection: redisConnection,
        })
    }

    public async addJobOnDemand() {
        console.log('Adicionando job recorrente à fila de drop cables...')
        this.queue.add(
            'drop-cables-queue',
            {},
            {
                jobId: 'drop-cables-on-demand-job',
                ...jobsCustomerDefaultOptions,
            },
        )
    }
}
