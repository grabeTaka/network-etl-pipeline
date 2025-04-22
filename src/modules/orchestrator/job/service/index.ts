import cron from 'node-cron'
import { UnifyDataFromExtractUseCase } from '../use-cases/unify-data-from-extract-use-case'
import { CreateFlowDataUseCase } from '../use-cases/create-flow-data-use-case'
import { logger } from '@/modules/shared/utils/logger'

class ExtractDataJobService {
    private repeatEveryMinutes: string = process.env.JOB_REPEAT_EVERY_MINUTES
        ? process.env.JOB_REPEAT_EVERY_MINUTES
        : '1'
    constructor() {
        this.schedule()
        this.init()
    }

    async schedule(): Promise<void> {
        cron.schedule(`*/${this.repeatEveryMinutes} * * * *`, async () => {
            logger.info('[Cron] Triggering job execution...')
            try {
                const unifyDataFromExtractUseCase =
                    new UnifyDataFromExtractUseCase()
                const { boxes, cables, customers } =
                    await unifyDataFromExtractUseCase.execute()

                const createFlowDataUseCase = new CreateFlowDataUseCase()
                createFlowDataUseCase.prepare(boxes, customers, cables)
                await createFlowDataUseCase.execute()
            } catch (err) {
                logger.error('[cron] Failed to fetch from third-party API.', {
                    error: err,
                })
            }
        })
    }

    async init(): Promise<void> {
        logger.info('[Init on demand] Triggering job execution...')
        console.log(process.env.JOB_REPEAT_EVERY_MINUTES)
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
}

export const extractDataJob = new ExtractDataJobService()
