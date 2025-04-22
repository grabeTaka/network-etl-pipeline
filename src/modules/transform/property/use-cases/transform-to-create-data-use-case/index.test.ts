import { expect } from 'chai'
import sinon from 'sinon'
import { TransformToCreateDataUseCase } from '@/modules/transform/property/use-cases/transform-to-create-data-use-case'
import { CustomerSchema as ExtractCustomerSchema } from '@/modules/extract/customer/schema'

describe('TransformToCreateDataUseCase', () => {
    let transformToCreateDataUseCase: TransformToCreateDataUseCase

    beforeEach(() => {
        transformToCreateDataUseCase = new TransformToCreateDataUseCase()
    })

    it('should transform customer data to CreatePropertyDTO format', () => {
        const externalLoadBoxId = 'box123'
        const customer: ExtractCustomerSchema = {
            id: 1,
            name: 'John Doe',
            code: 'C123',
            address: '123 Main St, Cityville',
        }

        transformToCreateDataUseCase.prepare(externalLoadBoxId, customer)

        const result = transformToCreateDataUseCase.execute()

        expect(result).to.deep.equal({
            name: 'C123 - John Doe',
            box: externalLoadBoxId,
            address: '123 Main St, Cityville',
            project: '',
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

        transformToCreateDataUseCase.prepare(externalLoadBoxId, customer)

        const executeSpy = sinon.spy(transformToCreateDataUseCase, 'execute')

        transformToCreateDataUseCase.execute()

        expect(executeSpy.calledOnce).to.be.true
        expect(executeSpy.returnValues[0]).to.deep.equal({
            name: 'C456 - Jane Smith',
            box: externalLoadBoxId,
            address: '456 Oak St, Townsville',
            project: '',
        })

        executeSpy.restore()
    })
})
