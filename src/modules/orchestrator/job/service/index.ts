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
                const unifyDataFromExtractUseCase =
                    new UnifyDataFromExtractUseCase()
                const { boxesEnriched, unlinkedCustomers, unlinkedCables } =
                    await unifyDataFromExtractUseCase.execute()

                console.log('Fluxo de jobs iniciado!')
                const createFlowDataUseCase = new CreateFlowDataUseCase()
                createFlowDataUseCase.prepare(boxesEnriched)
                await createFlowDataUseCase.execute()

                
            } catch (err) {
                console.error('[cron] Falha ao buscar da API terceira.', err)
            }
        })
    }
}

export const extractDataJob = new ExtractDataJobService()

//TODO FILTRAR BOXES PELO MESMO NOME, SDK DA OZMAP N ACEITA NOME DE BOXES REPETIDOS
//Verificar se precisamos filtrar customer por algum campo (talvez não)
//Cables filtrar cables que não possuam um array de boxes connected, é necessário duas boxes para realizar a conexão
