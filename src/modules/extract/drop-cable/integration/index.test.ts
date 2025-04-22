import { expect } from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import { ExtractDropCableIntegratrion } from '@/modules/extract/drop-cable/integration'
import { DropCableSchema } from '@/modules/extract/drop-cable/schema'
import { SourceExtractorErrors } from '@/modules/extract/drop-cable/integration'

describe('ExtractDropCableIntegratrion', () => {
    let integration: ExtractDropCableIntegratrion
    let axiosGetStub: sinon.SinonStub

    beforeEach(() => {
        integration = new ExtractDropCableIntegratrion()
        axiosGetStub = sinon.stub(axios, 'get')
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should throw SourceExtractorErrors on API error', async () => {
        const error = {
            response: {
                data: { message: 'Error in integration' },
                status: 400,
            },
            request: {
                method: 'GET',
                path: '/drop_cables',
            },
        }

        axiosGetStub.rejects(error)

        try {
            await integration.getAll()
            expect.fail('Expected error to be thrown')
        } catch (err) {
            expect(err).to.be.instanceOf(SourceExtractorErrors)
            expect(err.message).to.equal('Error in integration')
            expect(err.code).to.equal(400)
        }
    })
})
