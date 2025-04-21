import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { loadPropertyService } from '@/modules/load/property/service'
import { ILoadPropertyService } from '@/modules/load/property/service/type'
import { ILoadingCustomersOrchestratorUseCase } from '@/modules/orchestrator/worker/customer/use-cases/loading-customers-orchestrator-use-case/type'
import registryBoxService from '@/modules/registry/box/service'
import { IRegistryBoxService } from '@/modules/registry/box/service/type'
import registryCustomerService from '@/modules/registry/property/service'
import { IRegistryPropertyService } from '@/modules/registry/property/service/type'
import { transformPropertyService } from '@/modules/transform/property/service'
import { ITransformPropertyService } from '@/modules/transform/property/service/type'
import { FilterPropertyUseCase } from '@/modules/orchestrator/worker/customer/use-cases/filter-property-use-case'

export class LoadingCustomersOrchestratorUseCase
    implements ILoadingCustomersOrchestratorUseCase
{
    private extractedCustomerData: ExtractCustomerSchema
    private registryPropertyService: IRegistryPropertyService
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
                createdLoadProperty.id as string,
                registeredBox._id,
            )

            return
        }

        const filterPropertyUseCase = new FilterPropertyUseCase()
        filterPropertyUseCase.prepare(
            registeredProperty,
            this.extractedCustomerData,
            registeredBox,
        )
        const { propertyNeedsUpdate } = filterPropertyUseCase.execute()

        if (propertyNeedsUpdate) {
            const transformPropertyDTO =
                this.transformPropertyService.transformToUpdate(
                    registeredBox.externalLoadId,
                    this.extractedCustomerData,
                )

            await this.loadPropertyService.update(
                transformPropertyDTO,
                registeredProperty.externalLoadId,
            )
            await this.registryPropertyService.update(
                registeredProperty._id,
                this.extractedCustomerData,
                registeredBox._id,
            )
        }
    }
}
