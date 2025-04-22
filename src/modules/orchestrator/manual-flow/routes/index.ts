import express, { Request, Response, NextFunction } from 'express'
import { orchestratorManualFlowController } from '@/modules/orchestrator/manual-flow/controller/'
import { HttpStatusCode } from '@/modules/shared/utils/enums/http-status-code'

const router = express.Router()

router
    .route('/full-sync')
    .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await orchestratorManualFlowController.fullSync(
                req,
                res,
            )
            res.status(HttpStatusCode.OK).json(result)
        } catch (e) {
            next(e)
        }
    })

router
    .route('/sync-boxes/:id')
    .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            await orchestratorManualFlowController.syncBox(req, res)
            res.status(HttpStatusCode.OK).json({
                message: 'Sent to the processing queue!',
            })
        } catch (e) {
            next(e)
        }
    })

router
    .route('/sync-properties/:id')
    .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            await orchestratorManualFlowController.syncProperty(req, res)
            res.status(HttpStatusCode.OK).json({
                message: 'Sent to the processing queue!',
            })
        } catch (e) {
            next(e)
        }
    })

router
    .route('/sync-cables/:id')
    .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            await orchestratorManualFlowController.syncCable(req, res)
            res.status(HttpStatusCode.OK).json({
                message: 'Sent to the processing queue!',
            })
        } catch (e) {
            next(e)
        }
    })

export default router
