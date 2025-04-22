import { PropertySchema } from '@/modules/registry/property/schema'
import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { CreatePropertyUseCase } from '@/modules/registry/property/use-cases/create-property-use-case'
import { FindPropertyByFilterUseCase } from '@/modules/registry/property/use-cases/find-property-by-filter-use-case'
import { UpdatePropertyUseCase } from '@/modules/registry/property/use-cases/update-property-use-case'

import { IRegistryPropertyService } from '@/modules/registry/property/service/type'

class RegistryPropertyService implements IRegistryPropertyService {
    findByFilter(value: string | number, key: string) {
        const useCase = new FindPropertyByFilterUseCase()
        useCase.prepare(value, key)
        return useCase.execute()
    }

    create = (
        property: Partial<ExtractCustomerSchema>,
        externalLoadProteryId: string,
        boxId: string | null,
    ): Promise<PropertySchema> => {
        const useCase = new CreatePropertyUseCase()
        useCase.prepare(property, externalLoadProteryId, boxId)
        return useCase.execute()
    }

    update(id: string, value: Partial<PropertySchema>, boxId: string) {
        const useCase = new UpdatePropertyUseCase()
        useCase.prepare(id, value, boxId)
        return useCase.execute()
    }
}

const registryPropertyService = new RegistryPropertyService()
export default registryPropertyService
