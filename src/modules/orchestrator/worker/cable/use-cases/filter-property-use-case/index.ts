import { IFilterCableUseCase } from './types'
import { CableSchema as RegisteredCableSchema } from '@/modules/registry/cable/schema/index'
import { BoxSchema as RegisteredBoxSchema } from '@/modules/registry/box/schema/index'
import { CableSchema as ExtractedCableSchema } from '@/modules/extract/cable/schema/index'

export class FilterCableUseCase implements IFilterCableUseCase {
    registeredCable: RegisteredCableSchema | null
    registeredBoxA: RegisteredBoxSchema
    registeredBoxB: RegisteredBoxSchema
    extractedCable: ExtractedCableSchema

    private hasDifference = (
        arr1: { lat?: number; lng?: number }[],
        arr2: { lat?: number; lng?: number }[],
    ) => {
        if (arr1.length !== arr2.length) return true

        return arr1.some((coord, index) => {
            const other = arr2[index]
            return coord.lat !== other.lat || coord.lng !== other.lng
        })
    }

    prepare = (
        registeredCable: RegisteredCableSchema | null,
        extractedCable: ExtractedCableSchema,
        registeredBoxA: RegisteredBoxSchema,
        registeredBoxB: RegisteredBoxSchema,
    ): void => {
        this.registeredCable = registeredCable
        this.extractedCable = extractedCable
        this.registeredBoxA = registeredBoxA
        this.registeredBoxB = registeredBoxB
    }

    execute = (): { cableNeedsUpdate: boolean } => {
        if (
            this.registeredCable.name !== this.extractedCable.name ||
            this.hasDifference(
                this.registeredCable.path,
                this.extractedCable.path,
            ) ||
            this.registeredCable.boxConnected[0] !== this.registeredBoxA._id ||
            this.registeredCable.boxConnected[1] !== this.registeredBoxB._id
        )
            return { cableNeedsUpdate: true }

        return { cableNeedsUpdate: false }
    }
}
