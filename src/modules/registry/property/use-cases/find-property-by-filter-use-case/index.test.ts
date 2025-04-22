import { expect } from 'chai'
import sinon from 'sinon'
import { FindPropertyByFilterUseCase } from '@/modules/registry/property/use-cases/find-property-by-filter-use-case'

describe('FindPropertyByFilterUseCase', () => {
    let findPropertyByFilterUseCase: FindPropertyByFilterUseCase
    let sandbox: sinon.SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        findPropertyByFilterUseCase = new FindPropertyByFilterUseCase()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should prepare the data correctly', () => {
        const value = 'some-value'
        const key = 'name'

        findPropertyByFilterUseCase.prepare(value, key)

        expect(findPropertyByFilterUseCase.value).to.equal(value)
        expect(findPropertyByFilterUseCase.key).to.equal(key)
    })
})
