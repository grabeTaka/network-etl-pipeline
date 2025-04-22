import {
    Property,
    CreatePropertyDTO,
    UpdatePropertyDTO,
} from '@ozmap/ozmap-sdk'

export interface ILoadPropertyService {
    create(data: CreatePropertyDTO): Promise<Property>
    update(data: UpdatePropertyDTO, externalLoadId: string)
}
