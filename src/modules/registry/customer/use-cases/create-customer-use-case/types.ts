import { BoxSchema } from '@/modules/registry/box/schema/index'

export interface ICreateCustomerUseCase {
    prepare: (box: BoxSchema, externalLoadBoxId: string) => void
    execute: () => Promise<BoxSchema>
}
