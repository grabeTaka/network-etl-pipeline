import cron from 'node-cron'
import { UnifyDataFromExtractUseCase } from '../use-cases/unify-data-from-extract-use-case'
import { CreateFlowDataUseCase } from '../use-cases/create-flow-data-use-case'
import { sdkInstace } from '@/modules/shared/utils/sdk-instance'

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
                const { boxesEnriched, unlinkedCustomers, unlinkedCables } =
                    await unifyDataFromExtractUseCase.execute()

                console.log('Fluxo de jobs iniciado!')
                const createFlowDataUseCase = new CreateFlowDataUseCase()
                createFlowDataUseCase.prepare(boxesEnriched)
                await createFlowDataUseCase.execute()

                const sdk = sdkInstace.getSdkInstance()

                console.log(await sdk.box.findById('6806f1cc39fb4dbf45a49221'))
            } catch (err) {
                console.error('[cron] Falha ao buscar da API terceira.', err)
            }
        })
    }
}

export const extractDataJob = new ExtractDataJobService()
