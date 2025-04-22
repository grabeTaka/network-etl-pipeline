import { expect } from 'chai'
import sinon from 'sinon'
import { FilterValidDataUseCase } from '@/modules/extract/box/use-cases/filter-valid-data-use-case'
import { CableSchema } from '@/modules/extract/cable/schema'
import { logger } from '@/modules/shared/utils/logger'

describe('FilterValidDataUseCase', () => {
    let filterValidDataUseCase: FilterValidDataUseCase
    let loggerWarnSpy: sinon.SinonSpy

    beforeEach(() => {
        filterValidDataUseCase = new FilterValidDataUseCase()
        loggerWarnSpy = sinon.spy(logger, 'warn')
    })

    afterEach(() => {
        loggerWarnSpy.restore()
    })

    it('should skip cables with invalid coordinates', () => {
        const invalidCables: CableSchema[] = [
            {
                id: 2,
                name: 'Cable 2',
                capacity: 100,
                boxes_connected: [1, 2],
                path: [
                    { lat: 91, lng: -74.006 },
                    { lat: 34.0522, lng: -181 },
                ],
            },
        ]

        filterValidDataUseCase.prepare(invalidCables)
        const result = filterValidDataUseCase.execute()

        expect(result).to.have.lengthOf(0)
        expect(loggerWarnSpy.calledOnce).to.be.true
    })

    it('should skip cables with empty path', () => {
        const emptyPathCables: CableSchema[] = [
            {
                id: 3,
                name: 'Cable 3',
                capacity: 100,
                boxes_connected: [1, 2],
                path: [],
            },
        ]

        filterValidDataUseCase.prepare(emptyPathCables)
        const result = filterValidDataUseCase.execute()

        expect(result).to.have.lengthOf(0)
        expect(loggerWarnSpy.calledOnce).to.be.true
    })
})
