import {
    Property,
    CreatePropertyDTO,
    UpdatePropertyDTO,
} from '@ozmap/ozmap-sdk'

export interface ILoadPropertyIntegration {
    create(property: CreatePropertyDTO): Promise<Property>
    update(data: UpdatePropertyDTO, id: string): Promise<void>
}
