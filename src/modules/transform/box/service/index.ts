import { BoxSchema } from '@/modules/extract/box/schema'
import { ITransformBoxService } from '@/modules/transform/box/service/type'
import { CreateBoxDTO, UpdateBoxDTO } from '@ozmap/ozmap-sdk'
import { TransformToCreateDataUseCase } from '@/modules/transform/box/use-cases/transform-to-create-data-use-case'
import { TransformToUpdateDataUseCase } from '@/modules/transform/box/use-cases/transform-to-update-data-use-case'

export class TransformBoxService implements ITransformBoxService {
    transformToCreate(
        boxTypeId: string,
        extractedBox: BoxSchema,
    ): CreateBoxDTO {
        const useCase = new TransformToCreateDataUseCase()
        useCase.prepare(boxTypeId, extractedBox)
        return useCase.execute()
    }

    transformToUpdate(
        boxTypeId: string | null,
        extractedBox: BoxSchema,
    ): UpdateBoxDTO {
        const useCase = new TransformToUpdateDataUseCase()
        useCase.prepare(boxTypeId, extractedBox)
        return useCase.execute()
    }
}

export const transformBoxService = new TransformBoxService()
