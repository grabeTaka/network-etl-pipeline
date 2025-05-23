import { FlowProducer, FlowJob } from 'bullmq'
import { ICreateFlowDataUseCase } from '@/modules/orchestrator/job/use-cases/create-flow-data-use-case/type'
import { redisConnection } from '@/modules/shared/utils/redis-connection'
import { queueDefaultOptions } from '@/modules/shared/utils/queue-default-options'
import { BoxSchema } from '@/modules/extract/box/schema'
import { CustomerSchema } from '@/modules/extract/customer/schema'
import { CableSchema } from '@/modules/extract/cable/schema'
import { logger } from '@/modules/shared/utils/logger'

export class CreateFlowDataUseCase implements ICreateFlowDataUseCase {
    private boxes: BoxSchema[]
    private customers: CustomerSchema[]
    private cables: CableSchema[]

    prepare = (
        boxes: BoxSchema[],
        customers: CustomerSchema[],
        cables: CableSchema[],
    ) => {
        this.boxes = boxes
        this.customers = customers
        this.cables = cables
    }

    execute = async (): Promise<void> => {
        const flowProducer = new FlowProducer({ connection: redisConnection })

        logger.info('[Flow Qeue] Starting the creation of flow data.')

        try {
            const boxJobs: FlowJob[] = this.boxes.map((box) => ({
                name: `box-${box.id}`,
                queueName: 'loading-boxes-queue',
                data: { box },
                opts: {
                    ...queueDefaultOptions,
                },
            }))

            const customerJobs: FlowJob[] = this.customers.map((customer) => ({
                name: `customer-${customer.id}`,
                queueName: 'loading-customers-queue',
                data: { customer },
                opts: {
                    ...queueDefaultOptions,
                },
                children: boxJobs,
            }))

            const cableJobs: FlowJob[] = this.cables.map((cable) => ({
                name: `cable-${cable.id}`,
                queueName: 'loading-cables-queue',
                data: { cable },
                opts: {
                    ...queueDefaultOptions,
                },
                children: customerJobs,
            }))

            const flow: FlowJob = {
                name: 'root',
                queueName: 'root',
                data: {},
                children: cableJobs,
            }

            logger.info('[Flow Qeue] Adding flow to the queue...')
            await flowProducer.add(flow)
            logger.info(
                '[Flow Qeue] Flow data creation completed successfully.',
            )
        } catch (err) {
            logger.error('[Flow Qeue] Failed to create flow data.', {
                error: err,
            })
            throw err
        }
    }
}
