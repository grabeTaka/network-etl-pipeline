import { expect } from 'chai'
import sinon from 'sinon'
import { CreateBoxTypeUseCase } from '@/modules/load/box-type/use-cases/create-box-type-use-case'
import { loadBoxTypeIntegration } from '@/modules/load/box-type/integration'
import { BoxType } from '@ozmap/ozmap-sdk'

describe('CreateBoxTypeUseCase', () => {
    let createBoxTypeUseCase: CreateBoxTypeUseCase
    let createStub: sinon.SinonStub

    beforeEach(() => {
        // Criando o stub para o método create da loadBoxTypeIntegration
        createStub = sinon.stub(loadBoxTypeIntegration, 'create')

        // Inicializando o caso de uso
        createBoxTypeUseCase = new CreateBoxTypeUseCase()
    })

    afterEach(() => {
        sinon.restore() // Restaura os stubs após cada teste
    })

    it('should create a new box type successfully', async () => {
        const boxTypeName = 'TestBoxType'

        // Simulando resposta bem-sucedida do método create
        const mockBoxType: BoxType = {
            id: 'boxType123',
            code: '',
            createdAt: '',
            updatedAt: '',
            prefix: '',
            default_reserve: 0,
            config: {
                base: {
                    color: '',
                },
                regular: {
                    fillColor: '',
                },
                not_implanted: {
                    fillColor: '',
                },
                draft: {
                    fillColor: '',
                },
            },
        }
        createStub.resolves(mockBoxType)

        // Preparando os dados
        createBoxTypeUseCase.prepare(boxTypeName)

        // Executando o caso de uso
        const result = await createBoxTypeUseCase.execute()

        // Verificando se o método create foi chamado com o parâmetro correto
        sinon.assert.calledOnce(createStub)
        sinon.assert.calledWith(createStub, boxTypeName)

        // Verificando o resultado retornado
        expect(result).to.deep.equal(mockBoxType)
    })

    it('should throw an error when creating a box type fails', async () => {
        const boxTypeName = 'TestBoxType'

        // Simulando erro no método create
        const error = new Error('Failed to create box type')
        createStub.rejects(error)

        // Preparando os dados
        createBoxTypeUseCase.prepare(boxTypeName)

        try {
            await createBoxTypeUseCase.execute()
            expect.fail('Expected method to throw an error')
        } catch (err) {
            // Verificando se o erro foi lançado corretamente
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Failed to create box type')
        }

        // Verificando se o método create foi chamado
        sinon.assert.calledOnce(createStub)
    })
})
