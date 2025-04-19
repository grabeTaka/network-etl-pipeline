import { Queue } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection'
import { queueDefaultOptions } from '@/modules/shared/utils/queue-default-options'
import { BoxSchema } from '@/modules/extract/box/schema'
import { ICreateBoxLoaderUseCase } from '@/modules/load/box/use-case/create-box-loader-use-case/type'


export class CreateBoxLoaderUseCase implements ICreateBoxLoaderUseCase {
    private createBoxQueue: Queue
    private data: BoxSchema

    constructor() {
        this.createBoxQueue = new Queue('loading-boxes-queue', { connection: redisConnection })
    }

    prepare = (data: BoxSchema) => {
        this.data = data
    }

    execute = async () => {
        await this.createBoxQueue.add('load-box', this.data,  queueDefaultOptions)
        console.log(`Job de criação de box enfileirado com ID`)
    }
}
