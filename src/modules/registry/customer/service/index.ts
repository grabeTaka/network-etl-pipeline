import { CustomerSchema } from '@/modules/registry/customer/schema'
import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'
import { CreateCustomerUseCase } from '@/modules/registry/customer/use-cases/create-customer-use-case'
import { FindCustomerByFilterUseCase } from '@/modules/registry/customer/use-cases/find-customer-by-filter-use-case'
import { UpdateCustomerUseCase } from '@/modules/registry/customer/use-cases/update-customer-use-case'

import { IRegistryCustomerService } from '@/modules/registry/customer/service/type'

class RegistryCustomerService implements IRegistryCustomerService {
    findByFilter(value: string | number, key: string) {
        const useCase = new FindCustomerByFilterUseCase()
        useCase.prepare(value, key)
        return useCase.execute()
    }

    create = (
        customer: Partial<ExtractCustomerSchema>,
        externalLoadCustomerId: string,
    ): Promise<CustomerSchema> => {
        const useCase = new CreateCustomerUseCase()
        useCase.prepare(customer, externalLoadCustomerId)
        return useCase.execute()
    }

    update(id: string, value: Partial<CustomerSchema>) {
        const useCase = new UpdateCustomerUseCase()
        useCase.prepare(id, value)
        return useCase.execute()
    }
}

const registryCustomerService = new RegistryCustomerService()
export default registryCustomerService
