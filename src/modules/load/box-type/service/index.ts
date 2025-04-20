import { ILoadBoxTypeService } from '@/modules/load/box-type/service/type'
import { FindByFilterUseCase } from '@/modules/load/box-type/use-cases/find-by-filer-use-case'
import { CreateBoxTypeUseCase } from '../use-cases/create-box-type-use-case'

export class LoadBoxTypeService implements ILoadBoxTypeService {
    async createOrFindOne(key: string, value: string | number) {
        const useCase = new FindByFilterUseCase()
        useCase.prepare(key, value)
        const boxType = await useCase.execute()

        if (!boxType) {
            const useCase = new CreateBoxTypeUseCase()
            useCase.prepare(value.toString())
            return useCase.execute()
        }

        return boxType
    }
}

export const loadBoxTypeService = new LoadBoxTypeService()
