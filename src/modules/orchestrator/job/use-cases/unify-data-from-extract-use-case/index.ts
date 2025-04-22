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

import { logger } from '@/modules/shared/utils/logger'

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
        try {
            logger.info('[Extract] Starting data extraction...')

            const boxes = await this.extractBoxService.getAll()
            logger.info(`[Extract] Finished extracting ${boxes.length} boxes.`)

            // Extração dos customers
            const customers = await this.extractCustomerService.getAll()
            logger.info(
                `[Extract] Finished extracting ${customers.length} customers.`,
            )

            // Extração dos cables
            const cables = await this.extractCableService.getAll()
            logger.info(
                `[Extract] Finished extracting ${cables.length} cables.`,
            )

            logger.info(
                '[UnifyDataFromExtractUseCase] Data extraction completed successfully.',
            )

            return {
                boxes,
                customers,
                cables,
            }
        } catch (err) {
            logger.error('[Extract] Data extraction failed.', { error: err })
            throw err
        }
    }
}
