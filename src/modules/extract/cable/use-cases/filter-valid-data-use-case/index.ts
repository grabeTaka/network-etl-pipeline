import { CableSchema } from '@/modules/extract/cable/schema'

import { IFilterValidDataUseCase } from '@/modules/extract/box/use-cases/filter-valid-data-use-case/type'
import { z } from 'zod'
import { logger } from '@/modules/shared/utils/logger'

export class FilterValidDataUseCase implements IFilterValidDataUseCase {
    private cables: CableSchema[]

    prepare = (cables: CableSchema[]) => {
        this.cables = cables
    }

    execute = (): CableSchema[] => {
        const mustExistsCableSchema = z.array(
            z.object({
                lat: z.number().min(-90).max(90),
                lng: z.number().min(-180).max(180),
            }),
        )

        this.cables = this.cables.filter((cable) => {
            try {
                mustExistsCableSchema.parse(cable.path)
                return true
            } catch (e) {
                logger.warn(
                    `[CableFilter] Skipping cable with id ${cable.id} due to invalid coordinates.`,
                )
                return false
            }
        })

        return this.cables
    }
}
