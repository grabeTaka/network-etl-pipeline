import { expect } from 'chai'
import sinon from 'sinon'
import { FindByFilterUseCase } from '@/modules/load/fiber-profile/use-cases/find-by-filer-use-case'
import { loadFiberProfileIntegration } from '@/modules/load/fiber-profile/integration'
import { FiberProfile } from '@ozmap/ozmap-sdk'

describe('FindByFilterUseCase', () => {
    let useCase: FindByFilterUseCase
    let findByFilterStub: sinon.SinonStub

    beforeEach(() => {
        findByFilterStub = sinon.stub(
            loadFiberProfileIntegration,
            'findByFilter',
        )
        useCase = new FindByFilterUseCase()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should find a fiber profile by filter', async () => {
        const expectedFiberProfile: FiberProfile = {
            id: 'fiber123',
            name: 'Fiber X',
            createdAt: '',
            updatedAt: '',
            defaultFiberColor: '',
            defaultTubeColor: '',
            fibers: [],
            tubes: [],
        }

        findByFilterStub.resolves(expectedFiberProfile)

        useCase.prepare('name', 'Fiber X')
        const result = await useCase.execute()

        expect(result).to.deep.equal(expectedFiberProfile)
        sinon.assert.calledOnceWithExactly(findByFilterStub, 'Fiber X', 'name')
    })

    it('should throw an error if findByFilter fails', async () => {
        const error = new Error('Not found')
        findByFilterStub.rejects(error)

        useCase.prepare('id', 'fiber123')

        try {
            await useCase.execute()
            expect.fail('Expected execute to throw')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Not found')
        }

        sinon.assert.calledOnce(findByFilterStub)
    })
})
