import { BoxWorker } from '@/modules/orchestrator/worker/box/service'

export class WorkerOrchestrator {
    constructor() {
        new BoxWorker()
    }
}
