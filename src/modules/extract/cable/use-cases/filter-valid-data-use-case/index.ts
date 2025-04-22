import { CableSchema } from '@/modules/extract/cable/schema'

import { IFilterValidDataUseCase } from '@/modules/extract/box/use-cases/filter-valid-data-use-case/type'
import { z } from 'zod'

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
                console.log(
                    `O cable com o id ${cable.id} não será incluso na sincronização pois contém coordenadas inválidas em seu path`,
                )
                return false
            }
        })

        return this.cables
    }
}
