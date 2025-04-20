import { ILoadCreatePropertyUseCase } from '@/modules/load/property/use-case/load-create-property-use-case/type'
import { CreatePropertyDTO } from '@ozmap/ozmap-sdk'
import { ILoadPropertyIntegration } from '@/modules/load/property/integration/type'
import { loadPropertyIntegration } from '@/modules/load/property/integration'

export class LoadCreatePropertyUseCase implements ILoadCreatePropertyUseCase {
    private data: CreatePropertyDTO
    private loadPropertyIntegration: ILoadPropertyIntegration

    constructor() {
        this.loadPropertyIntegration = loadPropertyIntegration
    }

    prepare = (data: CreatePropertyDTO) => {
        this.data = data
    }

    execute = async () => {
        return this.loadPropertyIntegration.create(this.data)
    }
}
