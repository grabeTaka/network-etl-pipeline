import { expect } from 'chai'
import sinon from 'sinon'
import { LoadCreateBoxUseCase } from '@/modules/load/box/use-case/load-create-box-use-case'
import { loadBoxIntegration } from '@/modules/load/box/integration'
import { CreateBoxDTO } from '@ozmap/ozmap-sdk'

describe('LoadCreateBoxUseCase', () => {
    let loadCreateBoxUseCase: LoadCreateBoxUseCase
    let createStub: sinon.SinonStub

    beforeEach(() => {
        createStub = sinon.stub(loadBoxIntegration, 'create')

        loadCreateBoxUseCase = new LoadCreateBoxUseCase()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should throw an error when create box fails', async () => {
        const createBoxData: CreateBoxDTO = {
            coords: [0, 0],
            boxType: 'typeA',
            name: 'TestBox',
            project: 'projectId123',
            pole: 'poleId123',
            observation: 'Test observation',
            color: 'red',
            fill_color: 'blue',
            address: '123 Main St',
            hierarchyLevel: 1,
            implanted: false,
            max_distance: 100,
            external_id: 'externalId123',
            template: 'templateId123',
            tags: ['tag1', 'tag2'],
            shared: true,
            draft: false,
            certified: true,
            default_reserve: 50,
        }

        const error = new Error('Failed to create box')
        createStub.rejects(error)

        loadCreateBoxUseCase.prepare(createBoxData)

        try {
            await loadCreateBoxUseCase.execute()
            expect.fail('Expected method to throw an error')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Failed to create box')
        }

        sinon.assert.calledOnce(createStub)
    })
})
