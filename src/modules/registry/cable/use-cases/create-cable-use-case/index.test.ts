import { expect } from 'chai'
import sinon from 'sinon'
import { CreateCableUseCase } from '@/modules/registry/cable/use-cases/create-cable-use-case'
import { cableModel } from '@/modules/registry/cable/model'
import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'

describe('CreateCableUseCase', () => {
    let createCableUseCase: CreateCableUseCase
    let sandbox: sinon.SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        createCableUseCase = new CreateCableUseCase()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should prepare the cable data correctly', () => {
        const extractCable: ExtractCableSchema = {
            id: 1,
            name: 'Cable A',
            path: [
                { lat: 40.7128, lng: -74.006 },
                { lat: 34.0522, lng: -118.2437 },
            ],
            boxes_connected: [1, 2],
        }
        const externalLoadCableId = 'load-cable-id-123'
        const boxAId = 'box-id-1'
        const boxBId = 'box-id-2'

        createCableUseCase.prepare(
            extractCable,
            externalLoadCableId,
            boxAId,
            boxBId,
        )

        expect(createCableUseCase.cable.externalSourceId).to.equal(
            extractCable.id,
        )
        expect(createCableUseCase.cable.externalLoadId).to.equal(
            externalLoadCableId,
        )
        expect(createCableUseCase.cable.name).to.equal(extractCable.name)
        expect(createCableUseCase.cable.path).to.deep.equal(extractCable.path)
        expect(createCableUseCase.cable.boxConnected).to.deep.equal([
            boxAId,
            boxBId,
        ])
    })

    it('should handle errors if creation fails', async () => {
        const extractCable: ExtractCableSchema = {
            id: 1,
            name: 'Cable A',
            path: [
                { lat: 40.7128, lng: -74.006 },
                { lat: 34.0522, lng: -118.2437 },
            ],
            boxes_connected: [1, 2],
        }
        const externalLoadCableId = 'load-cable-id-123'
        const boxAId = 'box-id-1'
        const boxBId = 'box-id-2'

        const createStub = sandbox
            .stub(cableModel, 'create')
            .rejects(new Error('Database error'))

        createCableUseCase.prepare(
            extractCable,
            externalLoadCableId,
            boxAId,
            boxBId,
        )

        try {
            await createCableUseCase.execute()
        } catch (err) {
            expect(err.message).to.equal('Database error')
            expect(createStub.calledOnce).to.be.true
        }
    })
})
