import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { ILoadingBoxesOrchestratorUseCase } from '@/modules/orchestrator/worker/box/use-cases/loading-boxes-orchestrator-use-case/type'
import { IRegistryBoxService } from '@/modules/registry/box/service/type'
import { FilterBoxUseCase } from '../filter-box-use-case'
import { ILoadBoxTypeService } from '@/modules/load/box-type/service/type'
import { loadBoxTypeService } from '@/modules/load/box-type/service'
import { ITransformBoxService } from '@/modules/transform/box/service/type'
import { transformBoxService } from '@/modules/transform/box/service'
import { ILoadBoxService } from '@/modules/load/box/service/type'
import { loadBoxService } from '@/modules/load/box/service'
import registryBoxService from '@/modules/registry/box/service'
import { Job } from 'bullmq'
import { logger } from '@/modules/shared/utils/logger'

export class LoadingBoxesOrchestratorUseCase
    implements ILoadingBoxesOrchestratorUseCase
{
    private extractedBoxData: ExtractBoxSchema
    private registryBoxService: IRegistryBoxService
    private loadBoxTypeService: ILoadBoxTypeService
    private transformBoxService: ITransformBoxService
    private loadBoxService: ILoadBoxService
    private job: Job

    constructor() {
        this.registryBoxService = registryBoxService
        this.loadBoxTypeService = loadBoxTypeService
        this.transformBoxService = transformBoxService
        this.loadBoxService = loadBoxService
    }

    prepare(job: Job): void {
        this.extractedBoxData = job.data.box
        this.job = job
    }

    async execute(): Promise<void> {
        const [registeredBox] = await this.registryBoxService.findByFilter(
            this.extractedBoxData.id,
            'externalSourceId',
        )

        if (!registeredBox) {
            logger.info(
                `[BoxWorker] Starting to process to new box with ID: ${this.job.data.box.id}, ${this.job.attemptsMade + 1} of ${this.job.opts.attempts}`,
            )
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
            logger.info(
                `[BoxWorker] Successfully processed box with ID: ${this.job.data.box.id}`,
            )
            return
        }

        const filterBoxUseCase = new FilterBoxUseCase()
        filterBoxUseCase.prepare(registeredBox, this.extractedBoxData)
        const { boxNeedsUpdate, boxTypeFieldUpdate } =
            filterBoxUseCase.execute()

        if (boxNeedsUpdate) {
            logger.info(
                `[BoxWorker] Starting to process to update box with ID: ${this.job.data.box.id}, ${this.job.attemptsMade + 1} of ${this.job.opts.attempts}`,
            )
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
            logger.info(
                `[BoxWorker] Successfully processed box with ID: ${this.job.data.box.id}`,
            )
        }
    }
}
