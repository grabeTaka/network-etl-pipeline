import { expect } from 'chai'
import sinon from 'sinon'
import { FindCableByFilterUseCase } from '@/modules/registry/cable/use-cases/find-cable-by-filter-use-case'

describe('FindCableByFilterUseCase', () => {
    let findCableByFilterUseCase: FindCableByFilterUseCase
    let sandbox: sinon.SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        findCableByFilterUseCase = new FindCableByFilterUseCase()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should prepare the filter data correctly', () => {
        const value = 1
        const key = 'externalSourceId'

        findCableByFilterUseCase.prepare(value, key)

        expect(findCableByFilterUseCase.value).to.equal(value)
        expect(findCableByFilterUseCase.key).to.equal(key)
    })
})
