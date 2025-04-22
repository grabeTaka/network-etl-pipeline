import { CableSchema } from '@/modules/registry/cable/schema'

export interface IRegistryCableService {
    create(
        cable: CableSchema,
        externalLoadProteryId: string,
        boxAId: string,
        boxBId: string,
    ): Promise<CableSchema>
    findByFilter(value: string | number, key: string): Promise<CableSchema[]>
    update(
        id: string,
        value: Partial<CableSchema>,
        boxAId: string,
        boxBId: string,
    )
}
