import { expect } from 'chai'
import sinon from 'sinon'
import { GetAllUseCase } from '@/modules/extract/drop-cable/use-cases/get-all-use-case'
import { IExtractDropCableIntegration } from '@/modules/extract/drop-cable/integration/type'
import { DropCableSchema } from '@/modules/extract/drop-cable/schema'

describe('GetAllUseCase - DropCable', () => {
    let extractDropCableIntegrationStub: sinon.SinonStubbedInstance<IExtractDropCableIntegration>
    let getAllUseCase: GetAllUseCase

    const mockDropCables: DropCableSchema[] = [
        {
            id: 1,
            name: 'Drop Cable 1',
            box_id: 10,
            customer_id: 100,
        },
        {
            id: 2,
            name: 'Drop Cable 2',
            box_id: 20,
            customer_id: 200,
        },
    ]

    beforeEach(() => {
        extractDropCableIntegrationStub = {
            getAll: sinon.stub().resolves(mockDropCables) as any,
        }

        getAllUseCase = new GetAllUseCase(extractDropCableIntegrationStub)
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should call integration getAll and return data', async () => {
        const result = await getAllUseCase.execute()

        expect(result).to.be.an('array').with.lengthOf(2)
        expect(result[0]).to.deep.equal(mockDropCables[0])
        expect(result[1]).to.deep.equal(mockDropCables[1])
        sinon.assert.calledOnce(extractDropCableIntegrationStub.getAll)
    })

    it('should throw if integration getAll throws', async () => {
        const error = new Error('Failed to fetch')
        extractDropCableIntegrationStub.getAll.rejects(error)

        try {
            await getAllUseCase.execute()
            expect.fail('Expected method to throw')
        } catch (err) {
            expect(err).to.equal(error)
        }

        sinon.assert.calledOnce(extractDropCableIntegrationStub.getAll)
    })
})
