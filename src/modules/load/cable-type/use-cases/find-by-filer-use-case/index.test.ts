import { expect } from 'chai'
import sinon from 'sinon'
import { FindByFilterUseCase } from '@/modules/load/cable-type/use-cases/find-by-filer-use-case'
import { loadCableTypeIntegration } from '@/modules/load/cable-type/integration'
import { CableType } from '@ozmap/ozmap-sdk'

describe('FindByFilterUseCase', () => {
    let useCase: FindByFilterUseCase
    let findByFilterStub: sinon.SinonStub

    beforeEach(() => {
        findByFilterStub = sinon.stub(loadCableTypeIntegration, 'findByFilter')
        useCase = new FindByFilterUseCase()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should find a cable type by filter successfully', async () => {
        const key = 'name'
        const value = 'Cable Type A'

        const expectedResult: CableType = {
            id: 'abc123',
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

        findByFilterStub.resolves(expectedResult)

        useCase.prepare(key, value)
        const result = await useCase.execute()

        expect(result).to.deep.equal(expectedResult)
        sinon.assert.calledOnce(findByFilterStub)
        sinon.assert.calledWith(findByFilterStub, value, key)
    })

    it('should throw an error if findByFilter fails', async () => {
        const key = 'name'
        const value = 'InvalidCableType'
        const error = new Error('Cable type not found')

        findByFilterStub.rejects(error)

        useCase.prepare(key, value)

        try {
            await useCase.execute()
            expect.fail('Expected method to throw an error')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Cable type not found')
        }

        sinon.assert.calledOnce(findByFilterStub)
        sinon.assert.calledWith(findByFilterStub, value, key)
    })
})
