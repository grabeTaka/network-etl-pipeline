import { expect } from 'chai'
import sinon from 'sinon'
import { TransformToUpdateDataUseCase } from '@/modules/transform/property/use-cases/transform-to-update-data-use-case'
import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'

describe('TransformToUpdateDataUseCase', () => {
    let transformToUpdateDataUseCase: TransformToUpdateDataUseCase

    beforeEach(() => {
        transformToUpdateDataUseCase = new TransformToUpdateDataUseCase()
    })

    it('should transform customer data to UpdatePropertyDTO format', () => {
        const externalLoadBoxId = 'box123'
        const customer: ExtractCustomerSchema = {
            id: 1,
            name: 'John Doe',
            code: 'C123',
            address: '123 Main St, Cityville',
        }

        transformToUpdateDataUseCase.prepare(externalLoadBoxId, customer)

        const result = transformToUpdateDataUseCase.execute()

        expect(result).to.deep.equal({
            name: 'C123 - John Doe',
            box: externalLoadBoxId,
            address: '123 Main St, Cityville',
        })
    })

    it('should call prepare and execute correctly with different customer data', () => {
        const externalLoadBoxId = 'box456'
        const customer: ExtractCustomerSchema = {
            id: 2,
            name: 'Jane Smith',
            code: 'C456',
            address: '456 Oak St, Townsville',
        }

        transformToUpdateDataUseCase.prepare(externalLoadBoxId, customer)

        const executeSpy = sinon.spy(transformToUpdateDataUseCase, 'execute')

        transformToUpdateDataUseCase.execute()

        expect(executeSpy.calledOnce).to.be.true
        expect(executeSpy.returnValues[0]).to.deep.equal({
            name: 'C456 - Jane Smith',
            box: externalLoadBoxId,
            address: '456 Oak St, Townsville',
        })

        executeSpy.restore()
    })
})
