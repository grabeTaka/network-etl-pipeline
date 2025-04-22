import { expect } from 'chai'
import sinon from 'sinon'
import { CreateBoxUseCase } from '@/modules/registry/box/use-cases/create-box-use-case'
import { boxModel } from '@/modules/registry/box/model'
import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'
import { BoxSchema } from '@/modules/registry/box/schema'
import { Document } from 'mongoose'

describe('CreateBoxUseCase', () => {
    let createBoxUseCase: CreateBoxUseCase
    let sandbox: sinon.SinonSandbox
    let boxData: ExtractBoxSchema

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        createBoxUseCase = new CreateBoxUseCase()

        boxData = {
            id: 123,
            name: 'Box Test',
            type: 'Type A',
            lat: 40.7128,
            lng: -74.006,
        } as ExtractBoxSchema
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should prepare the box data correctly', () => {
        const externalLoadBoxId = 'external-load-id-123'

        createBoxUseCase.prepare(boxData, externalLoadBoxId)

        expect(createBoxUseCase.box.externalSourceId).to.equal(boxData.id)
        expect(createBoxUseCase.box.externalLoadId).to.equal(externalLoadBoxId)
        expect(createBoxUseCase.box.name).to.equal(boxData.name)
        expect(createBoxUseCase.box.typeName).to.equal(boxData.type)
        expect(createBoxUseCase.box.coordinates).to.deep.equal([
            boxData.lat,
            boxData.lng,
        ])
    })

    it('should throw an error if create fails', async () => {
        const externalLoadBoxId = 'external-load-id-123'

        createBoxUseCase.prepare(boxData, externalLoadBoxId)
        const createStub = sandbox
            .stub(boxModel, 'create')
            .rejects(new Error('Database error'))

        try {
            await createBoxUseCase.execute()
        } catch (err) {
            expect(err.message).to.equal('Database error')
            expect(createStub.calledOnce).to.be.true
        }
    })
})
