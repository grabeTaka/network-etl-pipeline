import { expect } from 'chai'
import { boxSchema } from '@/modules/extract/box/schema'

describe('boxSchema', () => {
    it('should validate a valid box', () => {
        const validBox = {
            id: 1,
            name: 'Box A',
            type: 'Type 1',
            lat: -23.5,
            lng: -46.6,
        }

        const result = boxSchema.safeParse(validBox)
        expect(result.success).to.be.true
    })

    it('should fail if id is missing or invalid', () => {
        const box = { name: 'Box A', type: 'Type 1', lat: 0, lng: 0 }

        const result = boxSchema.safeParse(box)
        expect(result.success).to.be.false
        expect(result.error.format().id?._errors[0]).to.include('Required')
    })

    it('should fail if name is empty', () => {
        const box = { id: 1, name: '', type: 'Type A', lat: 0, lng: 0 }

        const result = boxSchema.safeParse(box)
        expect(result.success).to.be.false
        expect(result.error.format().name?._errors[0]).to.include(
            'String must contain at least',
        )
    })

    it('should fail if lat or lng are missing or not numbers', () => {
        const box = {
            id: 1,
            name: 'Box A',
            type: 'Type A',
            lat: 'invalid',
            lng: null,
        }

        const result = boxSchema.safeParse(box)
        expect(result.success).to.be.false
        expect(result.error.format().lat?._errors[0]).to.include(
            'Expected number',
        )
        expect(result.error.format().lng?._errors[0]).to.include(
            'Expected number',
        )
    })
})
