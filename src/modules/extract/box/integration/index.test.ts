import { expect } from 'chai'
import sinon from 'sinon'
import MockAdapter from 'axios-mock-adapter'

import {
    ExtractBoxIntegration,
    SourceExtractorErrors,
} from '@/modules/extract/box/integration'

describe('ExtractBoxIntegration', () => {
    let integration: ExtractBoxIntegration
    let mockAxios: MockAdapter

    beforeEach(() => {
        integration = new ExtractBoxIntegration()
        mockAxios = new MockAdapter((integration as any).api)
    })

    afterEach(() => {
        mockAxios.restore()
        sinon.restore()
    })

    it('should return boxes when request is successful', async () => {
        const mockData = [
            { id: '1', name: 'Box A', lat: 10, lng: 20 },
            { id: '2', name: 'Box B', lat: -5, lng: 42 },
        ]

        mockAxios.onGet('/boxes').reply(200, mockData)

        const result = await integration.getAll()
        expect(result).to.deep.equal(mockData)
    })

    it('should throw SourceExtractorErrors on failure', async () => {
        mockAxios.onGet('/boxes').reply(500, { message: 'Internal Error' })

        try {
            await integration.getAll()
            throw new Error('Expected error was not thrown')
        } catch (error) {
            expect(error).to.be.instanceOf(SourceExtractorErrors)
            expect(error.message).to.equal('Internal Error')
            expect(error.code).to.equal(500)
        }
    })
})
