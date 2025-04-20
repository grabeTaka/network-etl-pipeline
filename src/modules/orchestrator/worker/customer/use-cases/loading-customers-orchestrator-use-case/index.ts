import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { ILoadingCustomersOrchestratorUseCase } from '@/modules/orchestrator/worker/customer/use-cases/loading-customers-orchestrator-use-case/type'

export class LoadingCustomersOrchestratorUseCase
    implements ILoadingCustomersOrchestratorUseCase
{
    private extractedCustomerData: ExtractCustomerSchema
    prepare(data: ExtractCustomerSchema): void {
        this.extractedCustomerData = data
    }

    async execute(): Promise<void> {
        console.log(this.extractedCustomerData)
    }
}

//TODO Check the name of box because the name is unique in project
