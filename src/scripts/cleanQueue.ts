import { Queue } from 'bullmq'
import { redisConnection } from '../utils/redis-connection'

async function cleanQueue() {
    const queue = new Queue('source-extractor-boxes-queue', {
        connection: redisConnection,
    })

    console.log('Limpando a fila...')

    // Remove jobs em vários estados
    await queue.drain(true) // Remove jobs aguardando e ativos
    await queue.clean(0, 1000, 'completed')
    await queue.clean(0, 1000, 'failed')
    await queue.clean(0, 1000, 'delayed')
    await queue.clean(0, 1000, 'wait')
    await queue.clean(0, 1000, 'paused')

    // Remove jobs de repeatables
    const repeatables = await queue.getRepeatableJobs()
    for (const job of repeatables) {
        await queue.removeRepeatableByKey(job.key)
        console.log(`Removed repeatable job: ${job.key}`)
    }

    await queue.close()
    console.log('Fila limpa!')
}

cleanQueue()
