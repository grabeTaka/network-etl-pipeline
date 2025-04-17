import { QueueEvents } from 'bullmq'
import { SourceExtractorCustomersQueue } from '@/modules/queue/SourceExtractorCustomersQueue/index'
import { SourceExtractorCablesQueue } from '@/modules/queue/SourceExtractorCablesQueue/index'
import { SourceExtractorDropCablesQueue } from '@/modules/queue/SourceExtractorDropCablesQueue/index'

import { redisConnection } from '@/utils/redis-connection'

export class SourceExtractorOrchestrator {
    private boxesQueueEvents = new QueueEvents('source-extractor-boxes-queue', {
        connection: redisConnection,
    })
    private customersQueueEvents = new QueueEvents(
        'source-extractor-customers-queue',
        { connection: redisConnection },
    )
    private cablesQueueEvents = new QueueEvents(
        'source-extractor-cables-queue',
        { connection: redisConnection },
    )

    constructor() {
        this.setupListeners()
    }

    private setupListeners() {
        // A → B
        this.boxesQueueEvents.on('completed', this.runCustomersQueue)
        this.boxesQueueEvents.on('failed', async (jobId) => {
            const isFinalAttempt = await this.isFinalAttempt(
                'source-extractor-boxes-queue',
                jobId.jobId,
            )
            if (isFinalAttempt) this.runCustomersQueue()
        })

        // B → C
        this.customersQueueEvents.on('completed', this.runCablesQueue)
        this.customersQueueEvents.on('failed', async (jobId) => {
            const isFinalAttempt = await this.isFinalAttempt(
                'source-extractor-customers-queue',
                jobId.jobId,
            )
            if (isFinalAttempt) this.runCablesQueue()
        })

        // C → D
        this.cablesQueueEvents.on('completed', this.runDropCablesQueue)
        this.cablesQueueEvents.on('failed', async (jobId) => {
            const isFinalAttempt = await this.isFinalAttempt(
                'source-extractor-drop-cables-queue',
                jobId.jobId,
            )
            if (isFinalAttempt) this.runDropCablesQueue()
        })
    }

    private runCustomersQueue = async () => {
        const customersQueue = new SourceExtractorCustomersQueue()
        await customersQueue.addJobOnDemand()
    }

    private runCablesQueue = async () => {
        const cablesQueue = new SourceExtractorCablesQueue()
        await cablesQueue.addJobOnDemand()
    }

    private runDropCablesQueue = async () => {
        const dropCablesQueue = new SourceExtractorDropCablesQueue()
        await dropCablesQueue.addJobOnDemand()
    }

    private async isFinalAttempt(
        queueName: string,
        jobId: string | undefined,
    ): Promise<boolean> {
        if (!jobId) return false
        const { Queue } = await import('bullmq')
        const queue = new Queue(queueName, { connection: redisConnection })
        const job = await queue.getJob(jobId)
        return job ? job.attemptsMade >= (job.opts.attempts ?? 1) : false
    }
}
