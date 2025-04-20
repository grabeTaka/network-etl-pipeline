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
        const [registeredBox] = await this.registryBoxService.findByFilter(
            this.extractedBoxData.id,
            'externalSourceId',
        )

        if (!registeredBox) {
            const boxType = await this.loadBoxTypeService.createOrFindOne(
                'code',
                this.extractedBoxData.type.toUpperCase(),
            )
            const transformBoxDTO = this.transformBoxService.transformToCreate(
                boxType.id as string,
                this.extractedBoxData,
            )
            const createdLoadBox =
                await this.loadBoxService.create(transformBoxDTO)
            await this.registryBoxService.create(
                this.extractedBoxData,
                createdLoadBox.id as string,
            )
            return
        }

        const filterBoxUseCase = new FilterBoxUseCase()
        filterBoxUseCase.prepare(registeredBox, this.extractedBoxData)
        const { boxNeedsUpdate, boxTypeFieldUpdate } =
            filterBoxUseCase.execute()

        if (boxNeedsUpdate) {
            let boxTypeId = null
            if (boxTypeFieldUpdate) {
                const boxType = await this.loadBoxTypeService.createOrFindOne(
                    'code',
                    this.extractedBoxData.type.toUpperCase(),
                )
                boxTypeId = boxType.id
            }

            const transformBoxDTO = this.transformBoxService.transformToUpdate(
                boxTypeId,
                this.extractedBoxData,
            )
            await this.loadBoxService.update(
                transformBoxDTO,
                registeredBox.externalLoadId,
            )
            await this.registryBoxService.update(
                registeredBox._id,
                this.extractedBoxData,
            )
        }
    }
}

//TODO Check the name of box because the name is unique in project
