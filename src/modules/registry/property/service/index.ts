import { PropertySchema } from '@/modules/registry/property/schema'
import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { CreatePropertyUseCase } from '@/modules/registry/property/use-cases/create-property-use-case'
import { FindPropertyByFilterUseCase } from '@/modules/registry/property/use-cases/find-property-by-filter-use-case'
import { UpdatePropertyUseCase } from '@/modules/registry/property/use-cases/update-property-use-case'

import { IRegistryCustomerService } from '@/modules/registry/property/service/type'

class RegistryCustomerService implements IRegistryCustomerService {
    findByFilter(value: string | number, key: string) {
        const useCase = new FindPropertyByFilterUseCase()
        useCase.prepare(value, key)
        return useCase.execute()
    }

    create = (
        property: Partial<ExtractCustomerSchema>,
        externalLoadCustomerId: string,
    ): Promise<PropertySchema> => {
        const useCase = new CreatePropertyUseCase()
        useCase.prepare(property, externalLoadCustomerId)
        return useCase.execute()
    }

    update(id: string, value: Partial<PropertySchema>) {
        const useCase = new UpdatePropertyUseCase()
        useCase.prepare(id, value)
        return useCase.execute()
    }
}

const registryCustomerService = new RegistryCustomerService()
export default registryCustomerService
