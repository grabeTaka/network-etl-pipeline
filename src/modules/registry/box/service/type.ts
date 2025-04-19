import { BoxSchema } from "@/modules/registry/box/schema"

export interface IBoxService {
    create(user: BoxSchema): Promise <BoxSchema>
    findByFilter(value: string | number, key: string): Promise <BoxSchema[]>
    update(id: string, value: Partial <BoxSchema>)
}