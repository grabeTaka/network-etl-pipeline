import cron from 'node-cron'
import { UnifyDataFromExtractUseCase } from '../use-cases/unify-data-from-extract-use-case'
import { CreateFlowDataUseCase } from '../use-cases/create-flow-data-use-case'

class ExtractDataJobService {
    private repeatEveryMinutes: string = process.env.JOB_REPEAT_EVERY_MINUTES
        ? process.env.JOB_REPEAT_EVERY_MINUTES
        : '1'
    constructor() {
        this.init()
    }

    async init(): Promise<void> {
        cron.schedule(`*/${this.repeatEveryMinutes} * * * *`, async () => {
            console.log('[cron] Disparando requisição...')

            try {
                const unifyDataFromExtractUseCase =
                    new UnifyDataFromExtractUseCase()
                const { boxes, cables, customers } =
                    await unifyDataFromExtractUseCase.execute()

                console.log('Fluxo de jobs iniciado!')
                const createFlowDataUseCase = new CreateFlowDataUseCase()
                createFlowDataUseCase.prepare(boxes, customers, cables)
                await createFlowDataUseCase.execute()
            } catch (err) {
                console.error('[cron] Falha ao buscar da API terceira.', err)
            }
        })
    }
}

export const extractDataJob = new ExtractDataJobService()
