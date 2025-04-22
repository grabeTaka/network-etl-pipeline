import { BoxSchema } from '@/modules/extract/box/schema/index'
import { IFilterValidDataUseCase } from '@/modules/extract/box/use-cases/filter-valid-data-use-case/type'
import { logger } from '@/modules/shared/utils/logger'
import { z } from 'zod'

export class FilterValidDataUseCase implements IFilterValidDataUseCase {
    private boxes: BoxSchema[]

    prepare = (boxes: BoxSchema[]) => {
        this.boxes = boxes
    }

    execute = (): BoxSchema[] => {
        const mustExistsBoxSchema = z.object({
            lat: z.number().min(-90).max(90),
            lng: z.number().min(-180).max(180),
        })

        const boxNameSet = new Set<string>()

        this.boxes = this.boxes.filter((box) => {
            try {
                mustExistsBoxSchema.parse(box)
                if (boxNameSet.has(box.name.toUpperCase())) {
                    logger.warn(
                        `[BoxFilter] Box with ID ${box.id} was skipped because its name "${box.name}" was already added.`,
                    )
                    boxNameSet.add(box.name.toUpperCase())
                    return false
                }

                return true
            } catch (e) {
                logger.warn(
                    `[BoxFilter] Box with ID ${box.id} was skipped due to invalid coordinates (lat: ${box.lat}, lng: ${box.lng}).`,
                )
                return false
            }
        })

        return this.boxes
    }
}
