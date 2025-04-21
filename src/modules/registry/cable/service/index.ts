import { CableSchema } from '@/modules/registry/cable/schema'
import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { CreateCableUseCase } from '@/modules/registry/cable/use-cases/create-cable-use-case'
import { FindCableByFilterUseCase } from '@/modules/registry/cable/use-cases/find-cable-by-filter-use-case'
import { UpdateCableUseCase } from '@/modules/registry/cable/use-cases/update-cable-use-case'

import { IRegistryCableService } from '@/modules/registry/cable/service/type'

class RegistryCableService implements IRegistryCableService {
    findByFilter(value: string | number, key: string) {
        const useCase = new FindCableByFilterUseCase()
        useCase.prepare(value, key)
        return useCase.execute()
    }

    create = (
        cable: Partial<ExtractCustomerSchema>,
        externalLoadProteryId: string,
        boxAId: string,
        boxBId: string,
    ): Promise<CableSchema> => {
        const useCase = new CreateCableUseCase()
        useCase.prepare(cable, externalLoadProteryId, boxAId, boxBId)
        return useCase.execute()
    }

    update(
        id: string,
        value: Partial<CableSchema>,
        boxAId: string,
        boxBId: string,
    ) {
        const useCase = new UpdateCableUseCase()
        useCase.prepare(id, value, boxAId, boxBId)
        return useCase.execute()
    }
}

const registryCableService = new RegistryCableService()
export default registryCableService
