import { expect } from 'chai'
import sinon from 'sinon'
import { LoadCreateCableUseCase } from '@/modules/load/cable/use-case/load-create-cable-use-case'
import { loadCableIntegration } from '@/modules/load/cable/integration'
import { CreateCableDTO } from '@ozmap/ozmap-sdk'

describe('LoadCreateCableUseCase', () => {
    let useCase: LoadCreateCableUseCase
    let createStub: sinon.SinonStub

    beforeEach(() => {
        createStub = sinon.stub(loadCableIntegration, 'create')
        useCase = new LoadCreateCableUseCase()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should create a cable successfully', async () => {
        const cableData: CreateCableDTO = {
            name: 'Cable 1',
            project: '',
            cableType: '',
            hierarchyLevel: 0,
            implanted: false,
            poles: [],
        }

        const mockResponse = { id: 'cable123', ...cableData }
        createStub.resolves(mockResponse)

        useCase.prepare(cableData)

        const result = await useCase.execute()

        expect(result).to.deep.equal(mockResponse)
        sinon.assert.calledOnce(createStub)
        sinon.assert.calledWith(createStub, cableData)
    })

    it('should throw an error when creation fails', async () => {
        const cableData: CreateCableDTO = {
            name: 'Cable 1',
            project: '',
            cableType: '',
            hierarchyLevel: 0,
            implanted: false,
            poles: [],
        }

        const error = new Error('Failed to create cable')
        createStub.rejects(error)

        useCase.prepare(cableData)

        try {
            await useCase.execute()
            expect.fail('Expected error to be thrown')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Failed to create cable')
        }

        sinon.assert.calledOnce(createStub)
        sinon.assert.calledWith(createStub, cableData)
    })
})
