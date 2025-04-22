import { expect } from 'chai'
import sinon from 'sinon'
import { UpdateCableUseCase } from '@/modules/registry/cable/use-cases/update-cable-use-case'
import { cableModel } from '@/modules/registry/cable/model'
import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'
import mongoose from 'mongoose'

describe('UpdateCableUseCase', () => {
    let updateCableUseCase: UpdateCableUseCase
    let sandbox: sinon.SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        updateCableUseCase = new UpdateCableUseCase()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should prepare the data correctly', () => {
        const id = new mongoose.Types.ObjectId()
        const value: Partial<ExtractCableSchema> = { name: 'Updated Cable' }
        const boxAId = 'boxAId'
        const boxBId = 'boxBId'

        updateCableUseCase.prepare(id.toString(), value, boxAId, boxBId)

        expect(updateCableUseCase.id.toString()).to.equal(id.toString())
        expect(updateCableUseCase.value).to.deep.equal(value)
        expect(updateCableUseCase.boxAId).to.equal(boxAId)
        expect(updateCableUseCase.boxBId).to.equal(boxBId)
    })

    it('should handle errors if update fails', async () => {
        const id = new mongoose.Types.ObjectId()
        const value: Partial<ExtractCableSchema> = { name: 'Updated Cable' }
        const boxAId = 'boxAId'
        const boxBId = 'boxBId'

        const updateStub = sandbox
            .stub(cableModel, 'updateOne')
            .rejects(new Error('Update failed'))

        updateCableUseCase.prepare(id.toString(), value, boxAId, boxBId)

        try {
            await updateCableUseCase.execute()
        } catch (err) {
            expect(err.message).to.equal('Update failed')
            expect(updateStub.calledOnce).to.be.true
        }
    })
})
