import { expect } from 'chai'
import sinon from 'sinon'
import { CreateCableTypeUseCase } from '@/modules/load/cable-type/use-cases/create-cable-type-use-case'
import { loadCableTypeIntegration } from '@/modules/load/cable-type/integration'
import { CableType } from '@ozmap/ozmap-sdk'

describe('CreateCableTypeUseCase', () => {
    let useCase: CreateCableTypeUseCase
    let createStub: sinon.SinonStub

    beforeEach(() => {
        createStub = sinon.stub(loadCableTypeIntegration, 'create')
        useCase = new CreateCableTypeUseCase()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should create a cable type successfully', async () => {
        const fiberProfileId = 'fiber-profile-id'
        const mockResponse: CableType = {
            id: 'cable-type-id',
            code: '',
            createdAt: '',
            updatedAt: '',
            default_level: 0,
            config: {
                regular: {
                    color: '',
                    weight: 0,
                },
                not_implanted: {
                    color: '',
                    weight: 0,
                },
            },
            fiberProfile: '',
            fiberNumber: 0,
            looseNumber: 0,
            base_loss: 0,
        }

        createStub.resolves(mockResponse)

        useCase.prepare(fiberProfileId)
        const result = await useCase.execute()

        expect(result).to.deep.equal(mockResponse)
        sinon.assert.calledOnce(createStub)
        sinon.assert.calledWith(createStub, fiberProfileId)
    })

    it('should throw an error when creation fails', async () => {
        const fiberProfileId = 'fiber-profile-id'
        const error = new Error('Failed to create cable type')

        createStub.rejects(error)

        useCase.prepare(fiberProfileId)

        try {
            await useCase.execute()
            expect.fail('Expected method to throw an error')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Failed to create cable type')
        }

        sinon.assert.calledOnce(createStub)
        sinon.assert.calledWith(createStub, fiberProfileId)
    })
})
