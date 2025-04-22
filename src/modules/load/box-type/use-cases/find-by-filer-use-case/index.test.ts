import { expect } from 'chai'
import sinon from 'sinon'
import { FindByFilterUseCase } from '@/modules/load/box-type/use-cases/find-by-filer-use-case'
import { loadBoxTypeIntegration } from '@/modules/load/box-type/integration'
import { BoxType } from '@ozmap/ozmap-sdk'

describe('FindByFilterUseCase', () => {
    let useCase: FindByFilterUseCase
    let findByFilterStub: sinon.SinonStub

    beforeEach(() => {
        // Cria stub para o método findByFilter do integration
        findByFilterStub = sinon.stub(loadBoxTypeIntegration, 'findByFilter')
        useCase = new FindByFilterUseCase()
    })

    afterEach(() => {
        sinon.restore() // Limpa os stubs após os testes
    })

    it('should find a box type by filter successfully', async () => {
        const key = 'name'
        const value = 'MyBoxType'

        const mockBoxType: BoxType = {
            id: 'abc123',
            code: '',
            createdAt: '',
            updatedAt: '',
            prefix: '',
            default_reserve: 0,
            config: {
                base: {
                    color: '',
                },
                regular: {
                    fillColor: '',
                },
                not_implanted: {
                    fillColor: '',
                },
                draft: {
                    fillColor: '',
                },
            },
        }

        findByFilterStub.resolves(mockBoxType)

        useCase.prepare(key, value)

        const result = await useCase.execute()

        sinon.assert.calledOnce(findByFilterStub)
        sinon.assert.calledWith(findByFilterStub, value, key)
        expect(result).to.deep.equal(mockBoxType)
    })

    it('should throw an error when findByFilter fails', async () => {
        const key = 'name'
        const value = 'FailBoxType'
        const error = new Error('findByFilter failed')

        findByFilterStub.rejects(error)

        useCase.prepare(key, value)

        try {
            await useCase.execute()
            expect.fail('Expected execute to throw')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('findByFilter failed')
        }

        sinon.assert.calledOnce(findByFilterStub)
        sinon.assert.calledWith(findByFilterStub, value, key)
    })
})
