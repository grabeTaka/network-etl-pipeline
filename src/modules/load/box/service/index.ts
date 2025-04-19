import { Box } from '@ozmap/ozmap-sdk'
import { ILoadBoxService } from '@/modules/load/box/service/type'
import { LoadCreateBoxUseCase } from '../use-case/load-create-box-use-case'

export class LoadBoxService implements ILoadBoxService {
    create(data: Box): Promise<Box> {
        const useCase = new LoadCreateBoxUseCase()
        useCase.prepare(data)
        return useCase.execute()
    }
}

export const loadBoxService = new LoadBoxService()
