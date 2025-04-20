import { UpdatePropertyDTO } from '@ozmap/ozmap-sdk'

export interface ILoadUpdatePropertyUseCase {
    prepare(data: UpdatePropertyDTO, externalLoadId: string): void
    execute(): Promise<void>
}
