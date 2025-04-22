import { expect } from 'chai'
import sinon from 'sinon'
import { CreateFiberProfileUseCase } from '@/modules/load/fiber-profile/use-cases/create-fiber-profile-use-case'
import { loadFiberProfileIntegration } from '@/modules/load/fiber-profile/integration'
import { FiberProfile } from '@ozmap/ozmap-sdk'

describe('CreateFiberProfileUseCase', () => {
    let useCase: CreateFiberProfileUseCase
    let createStub: sinon.SinonStub

    beforeEach(() => {
        createStub = sinon.stub(loadFiberProfileIntegration, 'create')
        useCase = new CreateFiberProfileUseCase()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should create a new fiber profile successfully', async () => {
        const expectedResult: FiberProfile = {
            id: 'fiber123',
            name: 'Fiber Profile 1',
            createdAt: '',
            updatedAt: '',
            defaultFiberColor: '',
            defaultTubeColor: '',
            fibers: [],
            tubes: [],
        }

        createStub.resolves(expectedResult)

        const result = await useCase.execute()

        expect(result).to.deep.equal(expectedResult)
        sinon.assert.calledOnce(createStub)
    })

    it('should throw an error if create fails', async () => {
        const error = new Error('Creation failed')
        createStub.rejects(error)

        try {
            await useCase.execute()
            expect.fail('Expected execute() to throw an error')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Creation failed')
        }

        sinon.assert.calledOnce(createStub)
    })
})
