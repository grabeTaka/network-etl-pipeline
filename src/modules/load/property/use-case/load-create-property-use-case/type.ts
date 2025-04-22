import { Property, CreatePropertyDTO } from '@ozmap/ozmap-sdk'

export interface ILoadCreatePropertyUseCase {
    prepare(data: CreatePropertyDTO): void
    execute(): Promise<Property>
}
