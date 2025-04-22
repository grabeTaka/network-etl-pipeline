import { expect } from 'chai'
import sinon from 'sinon'

import { GetAllUseCase } from '@/modules/extract/box/use-cases/get-all-use-case'
import { IExtractBoxIntegration } from '@/modules/extract/box/integration/type'
import { BoxSchema } from '@/modules/extract/box/schema'

describe('GetAllUseCase', () => {
    let mockIntegration: IExtractBoxIntegration
    let getAllStub: sinon.SinonStub
    const mockBoxes: BoxSchema[] = [
        { id: 1, name: 'Box A', type: 'Type 1', lat: 10, lng: 20 },
        { id: 2, name: 'Box B', type: 'Type 2', lat: 30, lng: 40 },
    ]

    beforeEach(() => {
        getAllStub = sinon.stub().resolves(mockBoxes)
        mockIntegration = {
            getAll: getAllStub,
        }
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should return boxes from integration', async () => {
        const useCase = new GetAllUseCase(mockIntegration)
        const result = await useCase.execute()

        expect(result).to.deep.equal(mockBoxes)
        expect(getAllStub.calledOnce).to.be.true
    })

    it('should throw if integration fails', async () => {
        const error = new Error('Failed to fetch')
        getAllStub.rejects(error)
        const useCase = new GetAllUseCase(mockIntegration)

        try {
            await useCase.execute()
            throw new Error('Test failed — should have thrown')
        } catch (err) {
            expect(err).to.equal(error)
        }
    })
})
