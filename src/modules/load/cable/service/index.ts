import { Cable, CreateCableDTO, UpdateCableDTO } from '@ozmap/ozmap-sdk'
import { ILoadCableService } from '@/modules/load/cable/service/type'
import { LoadCreateCableUseCase } from '@/modules/load/cable/use-case/load-create-cable-use-case'
import { LoadUpdateCableUseCase } from '@/modules/load/cable/use-case/load-update-cable-use-case'

export class LoadCableService implements ILoadCableService {
    update(data: UpdateCableDTO, externalLoadId: string) {
        const useCase = new LoadUpdateCableUseCase()
        useCase.prepare(data, externalLoadId)
        return useCase.execute()
    }
    create(data: CreateCableDTO): Promise<Cable> {
        const useCase = new LoadCreateCableUseCase()
        useCase.prepare(data)
        return useCase.execute()
    }
}

export const loadCableService = new LoadCableService()
