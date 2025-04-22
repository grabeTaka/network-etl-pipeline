import { expect } from 'chai'
import { customerSchema } from '@/modules/extract/customer/schema'

describe('customerSchema', () => {
    it('should pass validation with valid data', () => {
        const validData = {
            id: 1,
            name: 'John Doe',
            code: 'JD123',
            address: '123 Main St',
            box_id: 10,
        }

        const result = customerSchema.safeParse(validData)

        expect(result.success).to.be.true
        if (result.success) {
            expect(result.data).to.deep.equal(validData)
        }
    })

    it('should fail validation if any required field is missing', () => {
        const invalidData = {
            name: 'John Doe',
            code: 'JD123',
            address: '123 Main St',
        }

        const result = customerSchema.safeParse(invalidData)

        expect(result.success).to.be.false
        if (!result.success) {
            expect(result.error.errors).to.be.an('array').that.is.not.empty
        }
    })

    it('should fail validation with invalid types or constraints', () => {
        const invalidData = {
            id: 0,
            name: '',
            code: '',
            address: '',
            box_id: 'not a number',
        }

        const result = customerSchema.safeParse(invalidData)

        expect(result.success).to.be.false
        if (!result.success) {
            expect(result.error.errors.length).to.be.greaterThan(0)
        }
    })
})
