import { BoxSchema } from '@/modules/registry/box/schema'
import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { CreateBoxUseCase } from '@/modules/registry/box/use-cases/create-box-use-case'
import { FindBoxByFilterUseCase } from '@/modules/registry/box/use-cases/find-box-by-filter-use-case'
import { UpdateBoxUseCase } from '@/modules/registry/box/use-cases/update-box-use-case'
import { IRegistryBoxService } from '@/modules/registry/box/service/type'

class RegistryBoxService implements IRegistryBoxService {
    findByFilter(value: string | number, key: string) {
        const useCase = new FindBoxByFilterUseCase()
        useCase.prepare(value, key)
        return useCase.execute()
    }

    create = (
        box: Partial<ExtractBoxSchema>,
        externalLoadBoxId: string,
    ): Promise<BoxSchema> => {
        const useCase = new CreateBoxUseCase()
        useCase.prepare(box, externalLoadBoxId)
        return useCase.execute()
    }

    update(id: string, value: Partial<BoxSchema>) {
        const useCase = new UpdateBoxUseCase()
        useCase.prepare(id, value)
        return useCase.execute()
    }
}

const registryBoxService = new RegistryBoxService()
export default registryBoxService
