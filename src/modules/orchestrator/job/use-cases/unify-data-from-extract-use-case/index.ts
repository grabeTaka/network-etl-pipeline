import {
    IUnifyDataFromExtractUseCase,
    UnifiedBoxData,
    UnifyResult,
} from '@/modules/orchestrator/job/use-cases/unify-data-from-extract-use-case/type'
import { extractBoxService } from '@/modules/extract/box/service'
import { IExtractBoxService } from '@/modules/extract/box/service/type'

import { extractCustomerService } from '@/modules/extract/customer/service'
import { IExtractCustomerService } from '@/modules/extract/customer/service/type'

import { extractCableService } from '@/modules/extract/cable/service'
import { IExtractCableService } from '@/modules/extract/cable/service/type'

export class UnifyDataFromExtractUseCase
    implements IUnifyDataFromExtractUseCase
{
    private extractBoxService: IExtractBoxService
    private extractCustomerService: IExtractCustomerService
    private extractCableService: IExtractCableService

    constructor() {
        this.extractBoxService = extractBoxService
        this.extractCustomerService = extractCustomerService
        this.extractCableService = extractCableService
    }

    execute = async (): Promise<UnifyResult> => {
        const boxes = await this.extractBoxService.getAll()
        const customers = await this.extractCustomerService.getAll()
        const cables = await this.extractCableService.getAll()

        const boxesEnriched: UnifiedBoxData[] = boxes.map((box) => {
            const boxCustomers = customers.filter((c) => +c.box_id === +box.id)

            const boxCables = cables.filter((cable) => {
                const isBoxConnected = cable.boxes_connected.includes(box.id)
                const isCustomerConnected = boxCustomers.some((customer) =>
                    cable.boxes_connected.includes(customer.box_id),
                )
                return isBoxConnected || isCustomerConnected
            })

            return {
                box,
                customers: boxCustomers,
                cables: boxCables,
            }
        })

        const associatedCustomerIds = new Set(
            boxesEnriched.flatMap((b) => b.customers.map((c) => c.id)),
        )

        const associatedCableIds = new Set(
            boxesEnriched.flatMap((b) => b.cables.map((c) => c.id)),
        )

        const unlinkedCustomers = customers.filter(
            (c) => !associatedCustomerIds.has(c.id),
        )
        const unlinkedCables = cables.filter(
            (c) => !associatedCableIds.has(c.id),
        )

        return {
            boxesEnriched,
            unlinkedCustomers,
            unlinkedCables,
        }
    }
}
