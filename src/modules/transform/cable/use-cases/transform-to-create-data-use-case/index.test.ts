import { expect } from 'chai'
import sinon from 'sinon'
import { TransformToCreateDataUseCase } from '@/modules/transform/cable/use-cases/transform-to-create-data-use-case'
import { CableSchema as ExtractCableSchema } from '@/modules/extract/cable/schema'

describe('TransformToCreateDataUseCase', () => {
    let transformToCreateDataUseCase: TransformToCreateDataUseCase

    beforeEach(() => {
        transformToCreateDataUseCase = new TransformToCreateDataUseCase()
    })

    it('should transform cable data to CreateCableDTO format', () => {
        const externalLoadBoxAId = 'boxA123'
        const externalLoadBoxBId = 'boxB123'
        const cableTypeId = 'cableType123'
        const cable: ExtractCableSchema = {
            id: 1,
            name: 'Cable A',
            path: [
                { lat: 40.7128, lng: -74.006 },
                { lat: 34.0522, lng: -118.2437 },
            ],
        }

        transformToCreateDataUseCase.prepare(
            externalLoadBoxAId,
            externalLoadBoxBId,
            cableTypeId,
            cable,
        )

        const result = transformToCreateDataUseCase.execute()

        expect(result).to.deep.equal({
            project: '',
            cableType: cableTypeId,
            hierarchyLevel: 0,
            implanted: false,
            poles: [
                { lat: 40.7128, lng: -74.006 },
                { lat: 34.0522, lng: -118.2437 },
            ],
            boxA: externalLoadBoxAId,
            boxB: externalLoadBoxBId,
            name: 'Cable A',
        })
    })

    it('should call prepare and execute correctly with different cable data', () => {
        const externalLoadBoxAId = 'boxA456'
        const externalLoadBoxBId = 'boxB456'
        const cableTypeId = 'cableType456'
        const cable: ExtractCableSchema = {
            id: 2,
            name: 'Cable B',
            path: [
                { lat: 51.5074, lng: -0.1278 },
                { lat: 48.8566, lng: 2.3522 },
            ],
        }

        transformToCreateDataUseCase.prepare(
            externalLoadBoxAId,
            externalLoadBoxBId,
            cableTypeId,
            cable,
        )

        const executeSpy = sinon.spy(transformToCreateDataUseCase, 'execute')

        transformToCreateDataUseCase.execute()

        expect(executeSpy.calledOnce).to.be.true
        expect(executeSpy.returnValues[0]).to.deep.equal({
            project: '',
            cableType: cableTypeId,
            hierarchyLevel: 0,
            implanted: false,
            poles: [
                { lat: 51.5074, lng: -0.1278 },
                { lat: 48.8566, lng: 2.3522 },
            ],
            boxA: externalLoadBoxAId,
            boxB: externalLoadBoxBId,
            name: 'Cable B',
        })

        executeSpy.restore()
    })
})
