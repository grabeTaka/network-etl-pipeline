import { expect } from 'chai'
import sinon from 'sinon'
import { TransformToUpdateDataUseCase } from '@/modules/transform/box/use-cases/transform-to-update-data-use-case'
import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'

describe('TransformToUpdateDataUseCase', () => {
    let transformToUpdateDataUseCase: TransformToUpdateDataUseCase

    beforeEach(() => {
        transformToUpdateDataUseCase = new TransformToUpdateDataUseCase()
    })

    it('should transform box data to UpdateBoxDTO format when boxTypeId is provided', () => {
        const boxTypeId = 'boxTypeId123'
        const box: ExtractBoxSchema = {
            id: 1,
            name: 'Box A',
            lat: 40.7128,
            lng: -74.006,
        }

        transformToUpdateDataUseCase.prepare(boxTypeId, box)

        const result = transformToUpdateDataUseCase.execute()

        expect(result).to.deep.equal({
            coords: [40.7128, -74.006],
            hierarchyLevel: 0,
            boxType: boxTypeId,
            implanted: false,
            name: 'Box A',
        })
    })

    it('should transform box data to UpdateBoxDTO format when boxTypeId is not provided', () => {
        const boxTypeId = null
        const box: ExtractBoxSchema = {
            id: 2,
            name: 'Box B',
            lat: 34.0522,
            lng: -118.2437,
        }

        transformToUpdateDataUseCase.prepare(boxTypeId, box)

        const result = transformToUpdateDataUseCase.execute()

        expect(result).to.deep.equal({
            coords: [34.0522, -118.2437],
            hierarchyLevel: 0,
            implanted: false,
            name: 'Box B',
        })
    })

    it('should call prepare and execute correctly with different box data', () => {
        const boxTypeId = 'boxTypeId456'
        const box: ExtractBoxSchema = {
            id: 3,
            name: 'Box C',
            lat: 51.5074,
            lng: -0.1278,
        }

        transformToUpdateDataUseCase.prepare(boxTypeId, box)

        const executeSpy = sinon.spy(transformToUpdateDataUseCase, 'execute')

        transformToUpdateDataUseCase.execute()

        expect(executeSpy.calledOnce).to.be.true
        expect(executeSpy.returnValues[0]).to.deep.equal({
            coords: [51.5074, -0.1278],
            hierarchyLevel: 0,
            boxType: boxTypeId,
            implanted: false,
            name: 'Box C',
        })

        executeSpy.restore()
    })
})
