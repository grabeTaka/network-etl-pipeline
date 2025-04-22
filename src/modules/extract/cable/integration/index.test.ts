import { expect } from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import { ExtractCableIntegration } from '@/modules/extract/cable/integration'
import { CableSchema } from '@/modules/extract/cable/schema'
import { SourceExtractorErrors } from '@/modules/extract/cable/integration'

describe('ExtractCableIntegration', () => {
    let axiosGetStub: sinon.SinonStub
    let extractCableIntegration: ExtractCableIntegration
    const mockCables: CableSchema[] = [
        {
            id: 1,
            name: 'Cable A',
            capacity: 100,
            boxes_connected: [1, 2],
            path: [{ lat: 10, lng: 20 }],
        },
        {
            id: 2,
            name: 'Cable B',
            capacity: 150,
            boxes_connected: [3, 4],
            path: [{ lat: 30, lng: 40 }],
        },
    ]

    beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get')
        extractCableIntegration = new ExtractCableIntegration()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should throw SourceExtractorErrors if API call fails', async () => {
        const errorResponse = {
            response: {
                status: 400,
                data: { message: 'Error in integration' },
            },
        }
        axiosGetStub.rejects(errorResponse)

        try {
            await extractCableIntegration.getAll()
            throw new Error('Test failed — should have thrown')
        } catch (err) {
            expect(err).to.be.an.instanceof(SourceExtractorErrors)
            expect(err.code).to.equal(400)
            expect(err.message).to.equal('Error in integration')
        }
    })
})
