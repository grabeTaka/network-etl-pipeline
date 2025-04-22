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

        const boxNameSet = new Set<string>()

        this.boxes = this.boxes.filter((box) => {
            try {
                mustExistsBoxSchema.parse(box)
                if (boxNameSet.has(box.name)) {
                    console.log(`O box de id ${box.id} não será incluso na sincronização pois o nome da caixa já foi adicionado anteriormente.`)
                    return false
                }

                boxNameSet.add(box.name)

                return true
            } catch (e) {
                console.log(`O box com o id ${box.id} não será incluso na sincronização pois contém coordenadas inválidas`)
                return false
            }
        })

        return this.boxes
    }
}
