import { expect } from 'chai'
import sinon from 'sinon'
import { CreatePropertyUseCase } from '@/modules/registry/property/use-cases/create-property-use-case'
import { propertyModel } from '@/modules/registry/property/model'
import { CustomerSchema as ExtractPropertySchema } from '@/modules/extract/customer/schema'

describe('CreatePropertyUseCase', () => {
    let createPropertyUseCase: CreatePropertyUseCase
    let sandbox: sinon.SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        createPropertyUseCase = new CreatePropertyUseCase()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should prepare the data correctly', () => {
        const extractProperty: ExtractPropertySchema = {
            id: 123,
            name: 'Test Property',
            code: 'PROP-001',
            address: '123 Main St',
        }
        const externalLoadPropertyId = 'externalLoadId'
        const boxId = 'boxId'

        createPropertyUseCase.prepare(
            extractProperty,
            externalLoadPropertyId,
            boxId,
        )

        expect(createPropertyUseCase.property.externalSourceId).to.equal(
            extractProperty.id,
        )
        expect(createPropertyUseCase.property.externalLoadId).to.equal(
            externalLoadPropertyId,
        )
        expect(createPropertyUseCase.property.name).to.equal(
            extractProperty.name,
        )
        expect(createPropertyUseCase.property.code).to.equal(
            extractProperty.code,
        )
        expect(createPropertyUseCase.property.address).to.equal(
            extractProperty.address,
        )
        expect(createPropertyUseCase.property.boxId).to.equal(boxId)
    })

    it('should throw error if property creation fails', async () => {
        const extractProperty: ExtractPropertySchema = {
            id: 123,
            name: 'Test Property',
            code: 'PROP-001',
            address: '123 Main St',
        }
        const externalLoadPropertyId = 'externalLoadId'
        const boxId = 'boxId'

        const createStub = sandbox
            .stub(propertyModel, 'create')
            .rejects(new Error('Creation failed'))

        createPropertyUseCase.prepare(
            extractProperty,
            externalLoadPropertyId,
            boxId,
        )

        try {
            await createPropertyUseCase.execute()
        } catch (err) {
            expect(err.message).to.equal('Creation failed')
            expect(createStub.calledOnce).to.be.true
        }
    })
})
