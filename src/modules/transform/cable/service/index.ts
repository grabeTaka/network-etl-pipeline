import { CableSchema } from '@/modules/extract/cable/schema'
import { ITransformCableService } from '@/modules/transform/cable/service/type'
import { CreateCableDTO, UpdateCableDTO } from '@ozmap/ozmap-sdk'
import { TransformToCreateDataUseCase } from '@/modules/transform/cable/use-cases/transform-to-create-data-use-case'
import { TransformToUpdateDataUseCase } from '@/modules/transform/cable/use-cases/transform-to-update-data-use-case'

export class TransformCableService implements ITransformCableService {
    transformToCreate(
        externaLoadBoxAId: string,
        externaLoadBoxBId: string,
        cableTypeId: string,
        extractedCable: CableSchema,
    ): CreateCableDTO {
        const useCase = new TransformToCreateDataUseCase()
        useCase.prepare(
            externaLoadBoxAId,
            externaLoadBoxBId,
            cableTypeId,
            extractedCable,
        )
        return useCase.execute()
    }

    transformToUpdate(
        externaLoadBoxAId: string,
        externaLoadBoxBId: string,
        extractedCable: CableSchema,
    ): UpdateCableDTO {
        const useCase = new TransformToUpdateDataUseCase()
        useCase.prepare(externaLoadBoxAId, externaLoadBoxBId, extractedCable)
        return useCase.execute()
    }
}

export const transformCableService = new TransformCableService()
