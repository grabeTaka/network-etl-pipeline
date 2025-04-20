import {
    Property,
    CreatePropertyDTO,
    UpdatePropertyDTO,
} from '@ozmap/ozmap-sdk'

export interface ILoadPropertyIntegration {
    findByFilter(value: string | number, key: string): Promise<Property>
    create(property: CreatePropertyDTO): Promise<Property>
    update(data: UpdatePropertyDTO, id: string): Promise<void>
}
