import { expect } from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import { ExtractCustomerIntegratrion } from '@/modules/extract/customer/integration'

describe('ExtractCustomerIntegration', () => {
    let extractCustomerIntegration: ExtractCustomerIntegratrion
    let axiosGetStub: sinon.SinonStub

    beforeEach(() => {
        extractCustomerIntegration = new ExtractCustomerIntegratrion()
        axiosGetStub = sinon.stub(axios, 'get')
    })

    afterEach(() => {
        axiosGetStub.restore()
    })

    it('should throw an error when there is an API error', async () => {
        const errorResponse = {
            response: {
                data: { message: 'Error in integration' },
                status: 400,
            },
            request: {
                method: 'GET',
                path: '/customers',
            },
        }

        axiosGetStub.rejects(errorResponse)

        try {
            await extractCustomerIntegration.getAll()
            expect.fail('Expected error to be thrown')
        } catch (error: any) {
            expect(error).to.be.an('error')
            expect(error.message).to.equal('Error in integration')
            expect(error.code).to.equal(400)
        }
    })
})
