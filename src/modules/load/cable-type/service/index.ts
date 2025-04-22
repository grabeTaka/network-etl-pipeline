import { ILoadCableTypeService } from '@/modules/load/cable-type/service/type'
import { FindByFilterUseCase } from '@/modules/load/cable-type/use-cases/find-by-filer-use-case'
import { CreateCableTypeUseCase } from '../use-cases/create-cable-type-use-case'
import { CableType } from '@ozmap/ozmap-sdk'

export class LoadCableTypeService implements ILoadCableTypeService {
    async findOne(key: string, value: string | number) {
        const useCase = new FindByFilterUseCase()
        useCase.prepare(key, value)
        return useCase.execute()
    }

    create(fiberProfileId: string): Promise<CableType> {
        const useCase = new CreateCableTypeUseCase()
        useCase.prepare(fiberProfileId)
        return useCase.execute()
    }
}

export const loadCableTypeService = new LoadCableTypeService()
