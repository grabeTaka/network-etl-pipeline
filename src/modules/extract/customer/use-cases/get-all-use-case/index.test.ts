import { expect } from 'chai'
import sinon from 'sinon'
import { GetAllUseCase } from '@/modules/extract/customer/use-cases/get-all-use-case'
import { IExtractCustomerIntegration } from '@/modules/extract/customer/integration/type'
import { CustomerSchema } from '@/modules/extract/customer/schema'

describe('Customer - GetAllUseCase', () => {
    let integrationMock: IExtractCustomerIntegration
    let getAllStub: sinon.SinonStub
    let useCase: GetAllUseCase

    const mockCustomers: CustomerSchema[] = [
        {
            id: 1,
            name: 'Alice',
            code: 'A001',
            address: 'Rua Teste',
            box_id: 100,
        },
        {
            id: 2,
            name: 'Bob',
            code: 'B002',
            address: 'Rua Dois',
            box_id: 101,
        },
    ]

    beforeEach(() => {
        integrationMock = {
            getAll: async () => [],
        }

        getAllStub = sinon
            .stub(integrationMock, 'getAll')
            .resolves(mockCustomers)

        useCase = new GetAllUseCase(integrationMock)
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
