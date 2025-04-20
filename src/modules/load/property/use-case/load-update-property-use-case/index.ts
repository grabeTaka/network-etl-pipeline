import { ILoadUpdatePropertyUseCase } from '@/modules/load/property/use-case/load-update-property-use-case/type'
import { UpdatePropertyDTO } from '@ozmap/ozmap-sdk'
import { ILoadPropertyIntegration } from '@/modules/load/property/integration/type'
import { loadPropertyIntegration } from '@/modules/load/property/integration'

export class LoadUpdatePropertyUseCase implements ILoadUpdatePropertyUseCase {
    private data: UpdatePropertyDTO
    private externalLoadId: string
    private loadPropertyIntegration: ILoadPropertyIntegration

    constructor() {
        this.loadPropertyIntegration = loadPropertyIntegration
    }

    prepare = (data: UpdatePropertyDTO, externalLoadId: string) => {
        this.data = data
        this.externalLoadId = externalLoadId
    }

    execute = async () => {
        return this.loadPropertyIntegration.update(
            this.data,
            this.externalLoadId,
        )
    }
}
