import { expect } from 'chai'
import sinon from 'sinon'
import { UpdateBoxUseCase } from '@/modules/registry/box/use-cases/update-box-use-case'
import { boxModel } from '@/modules/registry/box/model'
import mongoose from 'mongoose'
import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'

describe('UpdateBoxUseCase', () => {
    let updateBoxUseCase: UpdateBoxUseCase
    let sandbox: sinon.SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        updateBoxUseCase = new UpdateBoxUseCase()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should prepare the id and value correctly', () => {
        const id = '507f191e810c19729de860ea'
        const value: Partial<ExtractBoxSchema> = {
            name: 'Updated Box',
            type: 'NewType',
            lat: 10.1234,
            lng: 20.5678,
        }

        updateBoxUseCase.prepare(id, value)

        expect(updateBoxUseCase.id.toString()).to.equal(id)
        expect(updateBoxUseCase.value).to.deep.equal(value)
    })

    it('should handle errors if update fails', async () => {
        const id = '507f191e810c19729de860ea'
        const value: Partial<ExtractBoxSchema> = {
            name: 'Updated Box',
            type: 'NewType',
            lat: 10.1234,
            lng: 20.5678,
        }

        const updateStub = sandbox
            .stub(boxModel, 'updateOne')
            .rejects(new Error('Database error'))

        updateBoxUseCase.prepare(id, value)

        try {
            await updateBoxUseCase.execute()
        } catch (err) {
            expect(err.message).to.equal('Database error')
            expect(updateStub.calledOnce).to.be.true
        }
    })
})
