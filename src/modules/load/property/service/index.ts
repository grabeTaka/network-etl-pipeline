import {
    Property,
    CreatePropertyDTO,
    UpdatePropertyDTO,
} from '@ozmap/ozmap-sdk'
import { ILoadPropertyService } from '@/modules/load/property/service/type'
import { LoadCreatePropertyUseCase } from '@/modules/load/property/use-case/load-create-property-use-case'
import { LoadUpdatePropertyUseCase } from '@/modules/load/property/use-case/load-update-property-use-case'

export class LoadPropertyService implements ILoadPropertyService {
    update(data: UpdatePropertyDTO, externalLoadId: string) {
        const useCase = new LoadUpdatePropertyUseCase()
        useCase.prepare(data, externalLoadId)
        return useCase.execute()
    }
    create(data: CreatePropertyDTO): Promise<Property> {
        const useCase = new LoadCreatePropertyUseCase()
        useCase.prepare(data)
        return useCase.execute()
    }
}

export const loadPropertyService = new LoadPropertyService()
