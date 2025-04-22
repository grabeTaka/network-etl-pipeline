import { FlowProducer } from 'bullmq'
import { redisConnection } from '@/modules/shared/utils/redis-connection'

import cron from 'node-cron'
import { UnifyDataFromExtractUseCase } from '../use-cases/unify-data-from-extract-use-case'
import { CreateFlowDataUseCase } from '../use-cases/create-flow-data-use-case'
import { sdkInstace } from '@/modules/shared/utils/sdk-instance'

class ExtractDataJobService {
    constructor() {
        this.init()
    }

    async init(): Promise<void> {
        cron.schedule('*/1 * * * *', async () => {
            console.log('[cron] Disparando requisição...')

            try {
                const unifyDataFromExtractUseCase =
                    new UnifyDataFromExtractUseCase()
                const { boxesEnriched, unlinkedCustomers, unlinkedCables } =
                    await unifyDataFromExtractUseCase.execute()

                console.log('Fluxo de jobs iniciado!')
                const createFlowDataUseCase = new CreateFlowDataUseCase()
                createFlowDataUseCase.prepare(boxesEnriched)
                await createFlowDataUseCase.execute()

                //const sdk = sdkInstace.getSdkInstance()
            } catch (err) {
                console.error('[cron] Falha ao buscar da API terceira.', err)
            }
        })
    }
}

export const extractDataJob = new ExtractDataJobService()

//Verificar se precisamos filtrar customer por algum campo (talvez não)
//Cables filtrar cables que não possuam um array de boxes connected, é necessário duas boxes para realizar a conexão
