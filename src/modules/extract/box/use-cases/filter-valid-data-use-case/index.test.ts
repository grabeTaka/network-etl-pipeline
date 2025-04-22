import { expect } from 'chai'
import { FilterValidDataUseCase } from '@/modules/extract/box/use-cases/filter-valid-data-use-case'
import { BoxSchema } from '@/modules/extract/box/schema'

describe('FilterValidDataUseCase', () => {
    let useCase: FilterValidDataUseCase

    beforeEach(() => {
        useCase = new FilterValidDataUseCase()
    })

    it('should filter out boxes with invalid coordinates', () => {
        const boxes: BoxSchema[] = [
            { id: 1, name: 'Box A', lat: 91, lng: 10 },
            { id: 2, name: 'Box B', lat: 45, lng: 190 },
            { id: 3, name: 'Box C', lat: 10, lng: 10 },
        ]

        useCase.prepare(boxes)
        const result = useCase.execute()

        expect(result).to.have.lengthOf(1)
        expect(result[0].id).to.equal(3)
    })

    it('should filter out boxes with duplicate names (case insensitive)', () => {
        const boxes: BoxSchema[] = [
            { id: 1, name: 'Main Box', lat: 10, lng: 10 },
            { id: 2, name: 'MAIN BOX', lat: 20, lng: 20 },
            { id: 3, name: 'Another Box', lat: 15, lng: 15 },
        ]

        useCase.prepare(boxes)
        const result = useCase.execute()

        expect(result).to.have.lengthOf(3)
        expect(result.map((b) => b.id)).to.include.members([1, 3])
    })

    it('should return all valid and unique boxes', () => {
        const boxes: BoxSchema[] = [
            { id: 1, name: 'Alpha', lat: 10, lng: 10 },
            { id: 2, name: 'Beta', lat: 20, lng: 20 },
            { id: 3, name: 'Gamma', lat: 30, lng: 30 },
        ]

        useCase.prepare(boxes)
        const result = useCase.execute()

        expect(result).to.have.lengthOf(3)
        expect(result.map((b) => b.id)).to.include.members([1, 2, 3])
    })
})
