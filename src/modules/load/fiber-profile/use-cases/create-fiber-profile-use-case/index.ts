import { FiberProfile } from '@ozmap/ozmap-sdk'
import { ICreateFiberProfileUseCase } from '@/modules/load/fiber-profile/use-cases/create-fiber-profile-use-case/type'
import { ILoadFiberProfileIntegration } from '@/modules/load/fiber-profile/integration/type'
import { loadFiberProfileIntegration } from '@/modules/load/fiber-profile/integration'

export class CreateFiberProfileUseCase implements ICreateFiberProfileUseCase {
    private loadFiberProfileIntegration: ILoadFiberProfileIntegration

    constructor() {
        this.loadFiberProfileIntegration = loadFiberProfileIntegration
    }

    execute(): Promise<FiberProfile> {
        return this.loadFiberProfileIntegration.create()
    }
}
