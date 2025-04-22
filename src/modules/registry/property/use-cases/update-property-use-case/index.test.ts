import { expect } from 'chai'
import sinon from 'sinon'
import { UpdatePropertyUseCase } from '@/modules/registry/property/use-cases/update-property-use-case'
import { propertyModel } from '@/modules/registry/property/model'
import { PropertySchema } from '@/modules/registry/property/schema'

describe('UpdatePropertyUseCase', () => {
    let updatePropertyUseCase: UpdatePropertyUseCase
    let sandbox: sinon.SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        updatePropertyUseCase = new UpdatePropertyUseCase()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should prepare the data correctly', () => {
        const id = '60b8b8c8f0f9f412f1d8f9c8'
        const value: Partial<PropertySchema> = { name: 'Updated Property' }
        const boxId = 'box123'

        updatePropertyUseCase.prepare(id, value, boxId)

        expect(updatePropertyUseCase.id.toString()).to.equal(id)
        expect(updatePropertyUseCase.value).to.deep.equal(value)
        expect(updatePropertyUseCase.boxId).to.equal(boxId)
    })
})
