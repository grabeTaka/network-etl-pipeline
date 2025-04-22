import { expect } from 'chai'
import sinon from 'sinon'
import { LoadCreateBoxUseCase } from '@/modules/load/box/use-case/load-create-box-use-case'
import { loadBoxIntegration } from '@/modules/load/box/integration'
import { CreateBoxDTO } from '@ozmap/ozmap-sdk'

describe('LoadCreateBoxUseCase', () => {
    let loadCreateBoxUseCase: LoadCreateBoxUseCase
    let createStub: sinon.SinonStub

    beforeEach(() => {
        // Criando o stub apenas para o método create
        createStub = sinon.stub(loadBoxIntegration, 'create')

        // Inicializando o caso de uso
        loadCreateBoxUseCase = new LoadCreateBoxUseCase()
    })

    afterEach(() => {
        sinon.restore() // Restaura os stubs após cada teste
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

        // Simulando erro no método create
        const error = new Error('Failed to create box')
        createStub.rejects(error)

        // Preparando os dados
        loadCreateBoxUseCase.prepare(createBoxData)

        try {
            await loadCreateBoxUseCase.execute()
            expect.fail('Expected method to throw an error')
        } catch (err) {
            // Verificando se o erro foi lançado
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Failed to create box')
        }

        // Verificando se o método create foi chamado
        sinon.assert.calledOnce(createStub)
    })
})
