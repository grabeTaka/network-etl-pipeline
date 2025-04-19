import { Queue, FlowProducer } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection'
import { extractBoxService } from '@/modules/extract/box/service'
import { extractCustomerService } from '@/modules/extract/customer/service'
import cron from 'node-cron'
import { JobOptions } from 'bull'

class ExtractDataJobService {
    constructor() {
        this.init()
    }

    async init(): Promise<void> {
        cron.schedule('*/1 * * * *', async () => {
            console.log('[cron] Disparando requisição...')

            try {
                const customers = await extractCustomerService.getAll()

                const boxes = await extractBoxService.getAll()
                const boxesChildren = boxes.map((box, index) => ({
                    name: `create-box-${index}-${index}`,
                    data: { box },
                    queueName: 'loading-boxes-queue',
                    opts: {
                        attempts: 3,
                        backoff: { type: 'exponential', delay: 2000 },
                    },
                }))
                /*const customersChildren = customers.map((customer, index) => {
                    const relatedBoxes = boxes.filter(box => +box.id === +customer.box_id)
                    
                    console.log(relatedBoxes)
                    const boxChildren = relatedBoxes.map((box, boxIndex) => ({
                        name: `create-box-${index}-${boxIndex}`,
                        data: { boxData: box },
                        queueName: 'loading-boxes-queue',
                        opts: {
                            attempts: 3,
                            backoff: { type: 'fixed', delay: 2000 }
                        }
                    }))

                    return {
                        name: `create-customer-${index}`,
                        data: { customerData: customer },
                        queueName: 'loading-customers-queue',
                        opts: {
                            attempts: 3,
                            backoff: { type: 'fixed', delay: 2000 }
                        },
                        children: boxChildren
                    }
                })*/

                const flowProducer = new FlowProducer({
                    connection: redisConnection,
                })
                await flowProducer.add({
                    name: 'create-customers-parent',
                    queueName: 'parent',
                    opts: {
                        attempts: 3,
                        backoff: { type: 'fixed', delay: 2000 },
                    },
                    children: boxesChildren,
                })

                console.log('Fluxo de jobs iniciado!')
            } catch (err) {
                console.error('[cron] Falha ao buscar da API terceira.', err)
            }
        })
    }
}

export const extractDataJob = new ExtractDataJobService()
