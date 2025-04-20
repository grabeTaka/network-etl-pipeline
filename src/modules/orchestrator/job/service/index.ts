import { FlowProducer } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection'

import cron from 'node-cron'
import { UnifyDataFromExtractUseCase } from '../use-cases/unify-data-from-extract-use-case'
import { CreateFlowDataUseCase } from '../use-cases/create-flow-data-use-case'

class ExtractDataJobService {
    constructor() {
        this.init()
    }

    public createBoxFlow = async (boxesEnriched: any[]) => {}

    async init(): Promise<void> {
        cron.schedule('*/1 * * * *', async () => {
            console.log('[cron] Disparando requisição...')

            try {
                //TODO Check if we can use query params in json server to filter box and customers
                const unifyDataFromExtractUseCase =
                    new UnifyDataFromExtractUseCase()
                const { boxesEnriched, unlinkedCustomers, unlinkedCables } =
                    await unifyDataFromExtractUseCase.execute()

                const createFlowDataUseCase = new CreateFlowDataUseCase()
                createFlowDataUseCase.prepare(boxesEnriched)
                await createFlowDataUseCase.execute()

                console.log('Fluxo de jobs iniciado!')
            } catch (err) {
                console.error('[cron] Falha ao buscar da API terceira.', err)
            }
        })
    }
}

export const extractDataJob = new ExtractDataJobService()
