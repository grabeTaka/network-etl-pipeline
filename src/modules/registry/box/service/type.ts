import { BoxSchema } from '@/modules/registry/box/schema'

export interface IRegistryBoxService {
    create(box: BoxSchema, externalLoadBoxId: string): Promise<BoxSchema>
    findByFilter(value: string | number, key: string): Promise<BoxSchema[]>
    update(id: string, value: Partial<BoxSchema>)
}
