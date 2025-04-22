import { expect } from 'chai'
import sinon from 'sinon'
import { dropCableSchema } from '@/modules/extract/drop-cable/schema'

describe('dropCableSchema validation', () => {
    it('should validate a correct drop cable object', () => {
        const validDropCable = {
            id: 1,
            name: 'Drop Cable 01',
            box_id: 101,
            customer_id: 201,
        }

        const result = dropCableSchema.safeParse(validDropCable)
        expect(result.success).to.be.true
        expect(result.data).to.deep.equal(validDropCable)
    })

    it('should fail validation if any required field is missing or invalid', () => {
        const invalidDropCable = {
            id: 0,
            name: '',
            box_id: 'not a number',
            customer_id: -5,
        }

        const result = dropCableSchema.safeParse(invalidDropCable)
        expect(result.success).to.be.false
        if (!result.success) {
            expect(result.error.issues).to.be.an('array').that.is.not.empty
            const issues = result.error.issues.map((issue) =>
                issue.path.join('.'),
            )
            expect(issues).to.include.members([
                'id',
                'name',
                'box_id',
                'customer_id',
            ])
        }
    })
})
