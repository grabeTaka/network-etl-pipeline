import { expect } from 'chai'
import sinon from 'sinon'
import { FindBoxByFilterUseCase } from '@/modules/registry/box/use-cases/find-box-by-filter-use-case'
import { boxModel } from '@/modules/registry/box/model'
import { BoxSchema } from '@/modules/registry/box/schema'

describe('FindBoxByFilterUseCase', () => {
    let findBoxByFilterUseCase: FindBoxByFilterUseCase
    let sandbox: sinon.SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        findBoxByFilterUseCase = new FindBoxByFilterUseCase()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should prepare the key and value correctly', () => {
        const value = 123
        const key = 'externalSourceId'

        findBoxByFilterUseCase.prepare(value, key)

        expect(findBoxByFilterUseCase.value).to.equal(value)
        expect(findBoxByFilterUseCase.key).to.equal(key)
    })

    it('should execute the find query correctly', async () => {
        const value = 123
        const key = 'externalSourceId'

        const mockBoxes: BoxSchema[] = [
            {
                _id: '1',
                name: 'Box 1',
                externalSourceId: 123,
                typeName: 'Type A',
                coordinates: [40.7128, -74.006],
            },
            {
                _id: '2',
                name: 'Box 2',
                externalSourceId: 123,
                typeName: 'Type B',
                coordinates: [34.0522, -118.2437],
            },
        ]

        const findStub = sandbox.stub(boxModel, 'find').resolves(mockBoxes)

        findBoxByFilterUseCase.prepare(value, key)

        const result = await findBoxByFilterUseCase.execute()

        expect(result).to.deep.equal(mockBoxes)
    })

    it('should handle errors if find fails', async () => {
        const value = 123
        const key = 'externalSourceId'

        const findStub = sandbox
            .stub(boxModel, 'find')
            .rejects(new Error('Database error'))

        findBoxByFilterUseCase.prepare(value, key)

        try {
            await findBoxByFilterUseCase.execute()
        } catch (err) {
            expect(err.message).to.equal('Database error')
            expect(findStub.calledOnce).to.be.true
        }
    })
})
