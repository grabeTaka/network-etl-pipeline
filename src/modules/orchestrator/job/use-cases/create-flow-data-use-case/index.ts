import { FlowProducer } from 'bullmq'
import { UnifiedBoxData } from '@/modules/orchestrator/job/use-cases/unify-data-from-extract-use-case/type'
import { ICreateFlowDataUseCase } from '@/modules/orchestrator/job/use-cases/create-flow-data-use-case/type'
import { redisConnection } from '@/modules/shared/utils/redis-connection'
import { queueDefaultOptions } from '@/modules/shared/utils/queue-default-options'
export class CreateFlowDataUseCase implements ICreateFlowDataUseCase {
    private boxesEnriched: UnifiedBoxData[]

    prepare = (boxesEnriched: UnifiedBoxData[]) => {
        this.boxesEnriched = boxesEnriched
    }

    execute = async (): Promise<void> => {
        for (const { box, customers, cables } of this.boxesEnriched) {
            const customerJobs = customers.map((customer) => ({
                name: `customer-${customer.id}`,
                queueName: 'loading-customers-queue',
                data: { customer },
                opts: queueDefaultOptions,
            }))

            const cableJobs = cables.map((cable) => ({
                name: `cable-${cable.id}`,
                queueName: 'loading-cables-queue',
                data: { cable },
                opts: queueDefaultOptions,
            }))

            const parents = [...customerJobs, ...cableJobs]
            const flowProducer = new FlowProducer({
                connection: redisConnection,
            })

            await flowProducer.addBulk(
                parents.map((parent) => ({
                    ...parent,
                    children: [
                        {
                            name: `create-box-${box.id}-${box.id}`,
                            data: { box },
                            queueName: 'loading-boxes-queue',
                            opts: queueDefaultOptions,
                        },
                    ],
                })),
            )
        }
    }
}
