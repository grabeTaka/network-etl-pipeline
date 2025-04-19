import { BoxSchema } from '@/modules/extract/box/schema/index'
import { IFilterValidDataUseCase } from '@/modules/extract/box/use-cases/filter-valid-data-use-case/type'
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

        this.boxes = this.boxes.filter((box) => {
            try {
                mustExistsBoxSchema.parse(box)
                return true
            } catch (e) {
                return false
            }
        })

        return this.boxes.filter(
            (value, index, self) =>
                index ===
                self.findIndex(
                    (t) => t.lat === value.lat && t.lng === value.lng,
                ),
        )
    }
}
