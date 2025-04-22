import { expect } from 'chai'
import sinon from 'sinon'
import { TransformToCreateDataUseCase } from '@/modules/transform/box/use-cases/transform-to-create-data-use-case'
import { BoxSchema as ExtractBoxSchema } from '@/modules/extract/box/schema'

describe('TransformToCreateDataUseCase', () => {
    let transformToCreateDataUseCase: TransformToCreateDataUseCase

    beforeEach(() => {
        transformToCreateDataUseCase = new TransformToCreateDataUseCase()
    })

    it('should transform box data to CreateBoxDTO format correctly', () => {
        const boxTypeId = 'boxTypeId123'
        const box: ExtractBoxSchema = {
            id: 1,
            name: 'Box A',
            lat: 40.7128,
            lng: -74.006,
        }

        transformToCreateDataUseCase.prepare(boxTypeId, box)

        const result = transformToCreateDataUseCase.execute()

        expect(result).to.deep.equal({
            project: '',
            coords: [40.7128, -74.006],
            hierarchyLevel: 0,
            boxType: boxTypeId,
            implanted: false,
            name: 'Box A',
        })
    })

    it('should call prepare and execute correctly with different box data', () => {
        const boxTypeId = 'boxTypeId456'
        const box: ExtractBoxSchema = {
            id: 2,
            name: 'Box B',
            lat: 34.0522,
            lng: -118.2437,
        }

        transformToCreateDataUseCase.prepare(boxTypeId, box)

        const executeSpy = sinon.spy(transformToCreateDataUseCase, 'execute')

        transformToCreateDataUseCase.execute()

        expect(executeSpy.calledOnce).to.be.true
        expect(executeSpy.returnValues[0]).to.deep.equal({
            project: '',
            coords: [34.0522, -118.2437],
            hierarchyLevel: 0,
            boxType: boxTypeId,
            implanted: false,
            name: 'Box B',
        })

        executeSpy.restore()
    })
})
