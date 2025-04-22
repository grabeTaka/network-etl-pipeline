import { Request, Response } from 'express'

export interface IOrchestratorManualFlowController {
    fullSync(req: Request, res: Response): void
    syncBox(req: Request, res: Response): Promise<void>
    syncProperty(req: Request, res: Response): Promise<void>
    syncCable(req: Request, res: Response): Promise<void>
}
