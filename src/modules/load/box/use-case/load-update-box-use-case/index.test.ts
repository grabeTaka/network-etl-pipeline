import { expect } from 'chai'
import sinon from 'sinon'
import { LoadUpdateBoxUseCase } from '@/modules/load/box/use-case/load-update-box-use-case'
import { loadBoxIntegration } from '@/modules/load/box/integration'
import { UpdateBoxDTO } from '@ozmap/ozmap-sdk'

describe('LoadUpdateBoxUseCase', () => {
    let loadUpdateBoxUseCase: LoadUpdateBoxUseCase
    let updateStub: sinon.SinonStub

    beforeEach(() => {
        // Criando o stub para o método update da loadBoxIntegration
        updateStub = sinon.stub(loadBoxIntegration, 'update')

        // Inicializando o caso de uso
        loadUpdateBoxUseCase = new LoadUpdateBoxUseCase()
    })

    afterEach(() => {
        sinon.restore() // Restaura os stubs após cada teste
    })

    it('should update a box successfully', async () => {
        const updateBoxData: UpdateBoxDTO = {
            coords: [1, 2],
            boxType: 'typeA',
            name: 'UpdatedBox',
            observation: 'Updated observation',
            color: 'green',
            fill_color: 'yellow',
            address: '456 Main St',
            hierarchyLevel: 2,
            implanted: true,
        }

        const externalLoadId = 'externalLoadId123'

        // Simulando resposta bem-sucedida do método update
        updateStub.resolves()

        // Preparando os dados
        loadUpdateBoxUseCase.prepare(updateBoxData, externalLoadId)

        // Executando o caso de uso
        await loadUpdateBoxUseCase.execute()

        // Verificando se o método update foi chamado com os parâmetros corretos
        sinon.assert.calledOnce(updateStub)
        sinon.assert.calledWith(updateStub, updateBoxData, externalLoadId)
    })

    it('should throw an error when update box fails', async () => {
        const updateBoxData: UpdateBoxDTO = {
            coords: [1, 2],
            boxType: 'typeA',
            name: 'UpdatedBox',
            observation: 'Updated observation',
            color: 'green',
            fill_color: 'yellow',
            address: '456 Main St',
            hierarchyLevel: 2,
            implanted: true,
        }

        const externalLoadId = 'externalLoadId123'

        // Simulando erro no método update
        const error = new Error('Failed to update box')
        updateStub.rejects(error)

        // Preparando os dados
        loadUpdateBoxUseCase.prepare(updateBoxData, externalLoadId)

        try {
            await loadUpdateBoxUseCase.execute()
            expect.fail('Expected method to throw an error')
        } catch (err) {
            // Verificando se o erro foi lançado
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Failed to update box')
        }

        // Verificando se o método update foi chamado
        sinon.assert.calledOnce(updateStub)
    })
})
