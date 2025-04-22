import { expect } from 'chai'
import sinon from 'sinon'
import { LoadUpdatePropertyUseCase } from '@/modules/load/property/use-case/load-update-property-use-case'
import { loadPropertyIntegration } from '@/modules/load/property/integration'
import {
    UpdatePropertyDTO,
    Property,
    BaseBoxKind,
    FTTHClientStatus,
} from '@ozmap/ozmap-sdk'

describe('LoadUpdatePropertyUseCase', () => {
    let useCase: LoadUpdatePropertyUseCase
    let updateStub: sinon.SinonStub

    beforeEach(() => {
        updateStub = sinon.stub(loadPropertyIntegration, 'update')
        useCase = new LoadUpdatePropertyUseCase()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should update property successfully', async () => {
        const propertyData: UpdatePropertyDTO = {
            name: 'Updated Property',
            address: 'Rua Nova',
            box: 'box456',
        }

        const externalLoadId = 'load123'

        const updatedProperty: Property = {
            id: 'property123',
            address: 'Rua Nova',
            createdAt: '',
            updatedAt: '',
            tags: [],
            project: '',
            kind: BaseBoxKind.PROPERTY,
            coords: [],
            client: {
                code: '',
                status: FTTHClientStatus.OK,
                id: '',
                createdAt: '',
                updatedAt: '',
                tags: [],
                kind: 'FTTHClient',
                certified: false,
                implanted: false,
                onu: {
                    user_PPPoE: '',
                    serial_number: '',
                    mac_address: '',
                },
                _id: '',
                external_id: '',
                name: '',
                creatorData: {
                    id: '',
                    name: '',
                    username: '',
                },
                deletedAt: undefined,
                observation: '',
                cpe: undefined,
            },
            connections: [],
        }

        updateStub.resolves(updatedProperty)

        useCase.prepare(propertyData, externalLoadId)
        const result = await useCase.execute()

        expect(result).to.deep.equal(updatedProperty)
        sinon.assert.calledOnceWithExactly(
            updateStub,
            propertyData,
            externalLoadId,
        )
    })

    it('should throw an error when update fails', async () => {
        const propertyData: UpdatePropertyDTO = {
            name: 'Erro Property',
            address: 'Erro Rua',
            box: 'box999',
        }

        const externalLoadId = 'load999'
        const error = new Error('Falha ao atualizar')

        updateStub.rejects(error)

        useCase.prepare(propertyData, externalLoadId)

        try {
            await useCase.execute()
            expect.fail('Expected execute to throw')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Falha ao atualizar')
        }

        sinon.assert.calledOnce(updateStub)
    })
})
