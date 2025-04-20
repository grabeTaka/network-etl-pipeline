import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { ILoadingCustomersOrchestratorUseCase } from '@/modules/orchestrator/worker/customer/use-cases/loading-customers-orchestrator-use-case/type'
import registryBoxService from '@/modules/registry/box/service'
import { IRegistryBoxService } from '@/modules/registry/box/service/type'
import registryCustomerService from '@/modules/registry/customer/service'
import { IRegistryCustomerService } from '@/modules/registry/customer/service/type'
import { transformCustomerService } from '@/modules/transform/customer/service'
import { ITransformCustomerService } from '@/modules/transform/customer/service/type'

export class LoadingCustomersOrchestratorUseCase
    implements ILoadingCustomersOrchestratorUseCase
{
    private extractedCustomerData: ExtractCustomerSchema
    private registryCustomerService: IRegistryCustomerService
    private registryBoxService: IRegistryBoxService
    private transformCustomerService: ITransformCustomerService

    constructor() {
        this.registryCustomerService = registryCustomerService
        this.registryBoxService = registryBoxService
        this.transformCustomerService = transformCustomerService
    }

    prepare(data: ExtractCustomerSchema): void {
        this.extractedCustomerData = data
    }

    async execute(): Promise<void> {
        const [registeredBox] = await this.registryBoxService.findByFilter(
            this.extractedCustomerData.box_id,
            'externalSourceId',
        )
        if (!registeredBox) {
            return
        }
        const [registeredCustomer] =
            await this.registryCustomerService.findByFilter(
                this.extractedCustomerData.id,
                'externalSourceId',
            )

        if (!registeredCustomer) {
            const transformCustomerDTO =
                this.transformCustomerService.transformToCreate(
                    registeredBox._id,
                    this.extractedCustomerData,
                )
        }
    }
}

//TODO Check the name of box because the name is unique in project
