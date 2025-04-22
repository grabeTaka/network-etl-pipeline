import {
    IUnifyDataFromExtractUseCase,
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

        return {
            boxes,
            customers,
            cables,
        }
    }
}
