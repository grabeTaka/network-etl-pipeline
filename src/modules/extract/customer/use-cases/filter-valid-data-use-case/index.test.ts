import { expect } from 'chai'
import sinon from 'sinon'

import { GetAllUseCase } from '@/modules/extract/customer/use-cases/get-all-use-case'
import { IExtractCustomerIntegration } from '@/modules/extract/customer/integration/type'
import { CustomerSchema } from '@/modules/extract/customer/schema'

describe('GetAllUseCase (Customer)', () => {
    let getAllStub: sinon.SinonStub
    let extractCustomerIntegrationMock: IExtractCustomerIntegration
    let useCase: GetAllUseCase

    const mockCustomers: CustomerSchema[] = [
        {
            id: 1,
            name: 'Alice',
            code: 'AL123',
            address: 'Rua Um',
            box_id: 99,
        },
        {
            id: 2,
            name: 'Bob',
            code: 'BO456',
            address: 'Rua Dois',
            box_id: 100,
        },
    ]

    beforeEach(() => {
        extractCustomerIntegrationMock = {
            getAll: async () => [],
        }

        getAllStub = sinon
            .stub(extractCustomerIntegrationMock, 'getAll')
            .resolves(mockCustomers)

        useCase = new GetAllUseCase(extractCustomerIntegrationMock)
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should return all customers from integration', async () => {
        const result = await useCase.execute()

        expect(result).to.deep.equal(mockCustomers)
        sinon.assert.calledOnce(getAllStub)
    })
})
