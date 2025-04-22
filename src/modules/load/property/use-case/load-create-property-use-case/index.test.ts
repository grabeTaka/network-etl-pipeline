import { expect } from 'chai'
import sinon from 'sinon'
import { LoadCreatePropertyUseCase } from '@/modules/load/property/use-case/load-create-property-use-case'
import { loadPropertyIntegration } from '@/modules/load/property/integration'
import {
    BaseBoxKind,
    CreatePropertyDTO,
    FTTHClientStatus,
    Property,
} from '@ozmap/ozmap-sdk'

describe('LoadCreatePropertyUseCase', () => {
    let useCase: LoadCreatePropertyUseCase
    let createStub: sinon.SinonStub

    beforeEach(() => {
        createStub = sinon.stub(loadPropertyIntegration, 'create')
        useCase = new LoadCreatePropertyUseCase()
    })

    afterEach(() => {
        sinon.restore()
    })

    it('should create a property successfully', async () => {
        const propertyData: CreatePropertyDTO = {
            address: '123 Rua XPTO',
            name: 'Imóvel A',
            box: 'box123',
            external_id: 'prop-ext-id',
            project: '',
        }

        const createdProperty: Property = {
            id: 'property123',
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

        createStub.resolves(createdProperty)

        useCase.prepare(propertyData)
        const result = await useCase.execute()

        expect(result).to.deep.equal(createdProperty)
        sinon.assert.calledOnceWithExactly(createStub, propertyData)
    })

    it('should throw an error when create fails', async () => {
        const propertyData: CreatePropertyDTO = {
            address: '123 Rua XPTO',
            name: 'Imóvel A',
            box: 'box123',
            external_id: 'prop-ext-id',
            project: '',
        }

        const error = new Error('Erro ao criar propriedade')
        createStub.rejects(error)

        useCase.prepare(propertyData)

        try {
            await useCase.execute()
            expect.fail('Expected execute to throw')
        } catch (err) {
            expect(err).to.be.an('error')
            expect(err.message).to.equal('Erro ao criar propriedade')
        }

        sinon.assert.calledOnce(createStub)
    })
})
