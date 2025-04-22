import { ILoadFiberProfileService } from '@/modules/load/fiber-profile/service/type'
import { FindByFilterUseCase } from '@/modules/load/fiber-profile/use-cases/find-by-filer-use-case'
import { CreateFiberProfileUseCase } from '../use-cases/create-fiber-profile-use-case'
import { FiberProfile } from '@ozmap/ozmap-sdk'

export class LoadFiberProfileService implements ILoadFiberProfileService {
    async findOne(key: string, value: string | number) {
        const useCase = new FindByFilterUseCase()
        useCase.prepare(key, value)
        return useCase.execute()
    }

    create(): Promise<FiberProfile> {
        const useCase = new CreateFiberProfileUseCase()
        return useCase.execute()
    }
}

export const loadFiberProfileService = new LoadFiberProfileService()
