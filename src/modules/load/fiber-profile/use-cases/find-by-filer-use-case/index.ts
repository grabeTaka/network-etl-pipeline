import { FiberProfile } from '@ozmap/ozmap-sdk'
import { IFindByFilterUseCase } from '@/modules/load/fiber-profile/use-cases/find-by-filer-use-case/type'
import { ILoadFiberProfileIntegration } from '@/modules/load/fiber-profile/integration/type'
import { loadFiberProfileIntegration } from '@/modules/load/fiber-profile/integration'

export class FindByFilterUseCase implements IFindByFilterUseCase {
    private loadFiberProfileIntegration: ILoadFiberProfileIntegration
    private key: string
    private value: string | number

    constructor() {
        this.loadFiberProfileIntegration = loadFiberProfileIntegration
    }

    prepare(key: string, value: string | number) {
        this.key = key
        this.value = value
    }

    execute(): Promise<FiberProfile> {
        return this.loadFiberProfileIntegration.findByFilter(
            this.value,
            this.key,
        )
    }
}
