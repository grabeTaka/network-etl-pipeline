import { BoxWorker } from '@/modules/orchestrator/worker/box/service'
import { CustomerWorker } from '@/modules/orchestrator/worker/customer/service'

export class WorkerOrchestrator {
    constructor() {
        new BoxWorker()
        new CustomerWorker()
    }
}
