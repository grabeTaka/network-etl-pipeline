import { expect } from 'chai'
import sinon from 'sinon'
import { LoadUpdateBoxUseCase } from '@/modules/load/box/use-case/load-update-box-use-case'
import { loadBoxIntegration } from '@/modules/load/box/integration'
import { UpdateBoxDTO } from '@ozmap/ozmap-sdk'

describe('LoadUpdateBoxUseCase', () => {
    let loadUpdateBoxUseCase: LoadUpdateBoxUseCase
    let updateStub: sinon.SinonStub

    beforeEach(() => {
        updateStub = sinon.stub(loadBoxIntegration, 'update')

        loadUpdateBoxUseCase = new LoadUpdateBoxUseCase()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should update a box successfully', async () => {
        const updateBoxData: UpdateBoxDTO = {
            coords: [1, 2],
            boxType: 'typeA',
            name: 'UpdatedBox',
            observation: 'Updated observation',
            color: 'green',
            fill_color: 'yellow',
            address: '456 Main St',
            hierarchyLevel: 2,
            implanted: true,
        }

        const externalLoadId = 'externalLoadId123'

        updateStub.resolves()

        loadUpdateBoxUseCase.prepare(updateBoxData, externalLoadId)

        await loadUpdateBoxUseCase.execute()

        sinon.assert.calledOnce(updateStub)
        sinon.assert.calledWith(updateStub, updateBoxData, externalLoadId)
    })

    it('should throw an error when update box fails', async () => {
        const updateBoxData: UpdateBoxDTO = {
            coords: [1, 2],
            boxType: 'typeA',
            name: 'UpdatedBox',
            observation: 'Updated observation',
            color: 'green',
            fill_color: 'yellow',
            address: '456 Main St',
            hierarchyLevel: 2,
            implanted: true,
        }

        const externalLoadId = 'externalLoadId123'

        const error = new Error('Failed to update box')
        updateStub.rejects(error)

        loadUpdateBoxUseCase.prepare(updateBoxData, externalLoadId)

        try {
            await loadUpdateBoxUseCase.execute()
            expect.fail('Expected method to throw an error')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Failed to update box')
        }

        sinon.assert.calledOnce(updateStub)
    })
})
