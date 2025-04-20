import { Box, CreateBoxDTO, UpdateBoxDTO } from '@ozmap/ozmap-sdk'
import { ILoadBoxService } from '@/modules/load/box/service/type'
import { LoadCreateBoxUseCase } from '@/modules/load/box/use-case/load-create-box-use-case'
import { LoadUpdateBoxUseCase } from '@/modules/load/box/use-case/load-update-box-use-case'

export class LoadBoxService implements ILoadBoxService {
    update(data: UpdateBoxDTO, externalLoadId: string) {
        const useCase = new LoadUpdateBoxUseCase()
        useCase.prepare(data, externalLoadId)
        return useCase.execute()
    }
    create(data: CreateBoxDTO): Promise<Box> {
        const useCase = new LoadCreateBoxUseCase()
        useCase.prepare(data)
        return useCase.execute()
    }
}

export const loadBoxService = new LoadBoxService()
