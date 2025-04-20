import { IFilterBoxUseCase } from './types'
import { BoxSchema as RegisteredBoxSchema } from '@/modules/registry/box/schema/index'
import { BoxSchema as ExtractedBoxSchema } from '@/modules/extract/box/schema/index'

export class FilterBoxUseCase implements IFilterBoxUseCase {
    registeredBox: RegisteredBoxSchema | null
    extractedBox: ExtractedBoxSchema

    prepare = (
        registeredBox: RegisteredBoxSchema | null,
        extractedBox: ExtractedBoxSchema,
    ): void => {
        this.registeredBox = registeredBox
        this.extractedBox = extractedBox
    }

    execute = (): { boxNeedsUpdate: boolean; boxTypeFieldUpdate: boolean } => {
        if (
            this.registeredBox.coordinates[0] !== this.extractedBox.lat ||
            this.registeredBox.coordinates[1] !== this.extractedBox.lng ||
            this.registeredBox.name !== this.extractedBox.name
        )
            return { boxNeedsUpdate: true, boxTypeFieldUpdate: false }

        if (this.registeredBox.typeName !== this.extractedBox.type)
            return { boxNeedsUpdate: true, boxTypeFieldUpdate: true }

        return { boxNeedsUpdate: false, boxTypeFieldUpdate: false }
    }
}
