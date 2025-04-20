import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { loadPropertyService } from '@/modules/load/property/service'
import { ILoadPropertyService } from '@/modules/load/property/service/type'
import { ILoadingCustomersOrchestratorUseCase } from '@/modules/orchestrator/worker/customer/use-cases/loading-customers-orchestrator-use-case/type'
import registryBoxService from '@/modules/registry/box/service'
import { IRegistryBoxService } from '@/modules/registry/box/service/type'
import registryCustomerService from '@/modules/registry/property/service'
import { IRegistryCustomerService } from '@/modules/registry/property/service/type'
import { transformPropertyService } from '@/modules/transform/property/service'
import { ITransformPropertyService } from '@/modules/transform/property/service/type'

export class LoadingCustomersOrchestratorUseCase
    implements ILoadingCustomersOrchestratorUseCase
{
    private extractedCustomerData: ExtractCustomerSchema
    private registryPropertyService: IRegistryCustomerService
    private registryBoxService: IRegistryBoxService
    private transformPropertyService: ITransformPropertyService
    private loadPropertyService: ILoadPropertyService

    constructor() {
        this.registryPropertyService = registryCustomerService
        this.registryBoxService = registryBoxService
        this.transformPropertyService = transformPropertyService
        this.loadPropertyService = loadPropertyService
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
        const [registeredProperty] =
            await this.registryPropertyService.findByFilter(
                this.extractedCustomerData.id,
                'externalSourceId',
            )

        if (!registeredProperty) {
            const transformCustomerDTO =
                this.transformPropertyService.transformToCreate(
                    registeredBox.externalLoadId,
                    this.extractedCustomerData,
                )

            const createdLoadProperty =
                await this.loadPropertyService.create(transformCustomerDTO)
            await this.registryPropertyService.create(
                this.extractedCustomerData,
                registeredBox.externalLoadId,
            )

            console.log(createdLoadProperty)
        } else {
            console.log(':D')
        }
    }
}

//TODO add code a collection customer
// trocar tudo de customer para property para manter coeso
