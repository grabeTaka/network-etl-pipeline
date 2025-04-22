import { orchestratorManualFlowService } from '../service'
import { IOrchestratorManualFlowService } from '../service/type'
import { IOrchestratorManualFlowController } from './type'
import express, { Request, Response, NextFunction } from 'express'

export class OrchestratorManualFlowController
    implements IOrchestratorManualFlowController
{
    private orchestratorManualFlowService: IOrchestratorManualFlowService
    constructor() {
        this.orchestratorManualFlowService = orchestratorManualFlowService
    }

    async fullSync(req: Request, res: Response): Promise<void> {
        await this.orchestratorManualFlowService.fullSync()
    }

    async syncBox(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        await this.orchestratorManualFlowService.syncBox(Number(id))
    }
    async syncProperty(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        await this.orchestratorManualFlowService.syncProperty(Number(id))
    }
    async syncCable(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        await this.orchestratorManualFlowService.syncCable(Number(id))
    }
}

export const orchestratorManualFlowController =
    new OrchestratorManualFlowController()
