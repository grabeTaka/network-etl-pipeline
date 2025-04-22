import { IOrchestratorManualFlowService } from './type'
import { IExtractCustomerIntegration } from '@/modules/extract/customer/integration/type'
import { ExtractCustomerIntegratrion } from '@/modules/extract/customer/integration'
import { IExtractBoxIntegration } from '@/modules/extract/box/integration/type'
import { IExtractCableIntegration } from '@/modules/extract/cable/integration/type'
import { ExtractBoxIntegration } from '@/modules/extract/box/integration'
import { ExtractCableIntegration } from '@/modules/extract/cable/integration'
import { logger } from '@typegoose/typegoose/lib/logSettings'
import { CreateFlowDataUseCase } from '../../job/use-cases/create-flow-data-use-case'
import { UnifyDataFromExtractUseCase } from '../../job/use-cases/unify-data-from-extract-use-case'
import { redisConnection } from '@/modules/shared/utils/redis-connection'
import { queueDefaultOptions } from '@/modules/shared/utils/queue-default-options'
import { Queue } from 'bullmq'

export class OrchestratorManualFlowService
    implements IOrchestratorManualFlowService
{
    extractPropertyIntegration: IExtractCustomerIntegration
    extractBoxIntegration: IExtractBoxIntegration
    extractCableIntegration: IExtractCableIntegration

    constructor() {
        this.extractPropertyIntegration = new ExtractCustomerIntegratrion()
        this.extractBoxIntegration = new ExtractBoxIntegration()
        this.extractCableIntegration = new ExtractCableIntegration()
    }

    async fullSync(): Promise<void> {
        logger.info('[Init on demand] Triggering job execution...')
        try {
            const unifyDataFromExtractUseCase =
                new UnifyDataFromExtractUseCase()
            const { boxes, cables, customers } =
                await unifyDataFromExtractUseCase.execute()
            const createFlowDataUseCase = new CreateFlowDataUseCase()
            createFlowDataUseCase.prepare(boxes, customers, cables)
            await createFlowDataUseCase.execute()
        } catch (err) {
            logger.error(
                '[Init on demand] Failed to fetch from third-party API.',
                {
                    error: err,
                },
            )
        }
    }
    async syncBox(id: number): Promise<void> {
        const box = await this.extractBoxIntegration.findOne(id)
        const queue = new Queue('loading-boxes-queue', {
            connection: redisConnection,
        })
        await queue.add(`box-${box.id}-manual`, { box }, queueDefaultOptions)
    }
    async syncProperty(id: number): Promise<void> {
        const property = await this.extractPropertyIntegration.findOne(id)
        const queue = new Queue('loading-customers-queue', {
            connection: redisConnection,
        })
        await queue.add(
            `property-${property.id}-manual`,
            { customer: property },
            queueDefaultOptions,
        )
    }
    async syncCable(id: number): Promise<void> {
        const cable = await this.extractCableIntegration.findOne(id)
        const queue = new Queue('loading-cables-queue', {
            connection: redisConnection,
        })
        await queue.add(
            `cable-${cable.id}-manual`,
            { cable },
            queueDefaultOptions,
        )
    }
}

export const orchestratorManualFlowService = new OrchestratorManualFlowService()
