import { expect } from 'chai'
import sinon from 'sinon'
import { CreateBoxTypeUseCase } from '@/modules/load/box-type/use-cases/create-box-type-use-case'
import { loadBoxTypeIntegration } from '@/modules/load/box-type/integration'
import { BoxType } from '@ozmap/ozmap-sdk'

describe('CreateBoxTypeUseCase', () => {
    let createBoxTypeUseCase: CreateBoxTypeUseCase
    let createStub: sinon.SinonStub

    beforeEach(() => {
        createStub = sinon.stub(loadBoxTypeIntegration, 'create')

        createBoxTypeUseCase = new CreateBoxTypeUseCase()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should create a new box type successfully', async () => {
        const boxTypeName = 'TestBoxType'

        const mockBoxType: BoxType = {
            id: 'boxType123',
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
        createStub.resolves(mockBoxType)

        createBoxTypeUseCase.prepare(boxTypeName)

        const result = await createBoxTypeUseCase.execute()

        sinon.assert.calledOnce(createStub)
        sinon.assert.calledWith(createStub, boxTypeName)

        expect(result).to.deep.equal(mockBoxType)
    })

    it('should throw an error when creating a box type fails', async () => {
        const boxTypeName = 'TestBoxType'

        const error = new Error('Failed to create box type')
        createStub.rejects(error)

        createBoxTypeUseCase.prepare(boxTypeName)

        try {
            await createBoxTypeUseCase.execute()
            expect.fail('Expected method to throw an error')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Failed to create box type')
        }

        sinon.assert.calledOnce(createStub)
    })
})
