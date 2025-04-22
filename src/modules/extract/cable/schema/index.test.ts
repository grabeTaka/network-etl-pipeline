import { expect } from 'chai'
import { cableSchema } from '@/modules/extract/cable/schema' // Aponte para o seu schema
import { CableSchema } from '@/modules/extract/cable/schema' // Tipo

describe('CableSchema Validation', () => {
    it('should validate valid cable schema', () => {
        const validCableData: CableSchema = {
            id: 1,
            name: 'Cable 1',
            capacity: 100,
            boxes_connected: [1, 2],
            path: [
                { lat: 40.7128, lng: -74.006 },
                { lat: 34.0522, lng: -118.2437 },
            ],
        }

        const result = cableSchema.safeParse(validCableData)
        expect(result.success).to.be.true
    })

    it('should fail validation for missing fields', () => {
        const invalidCableData = {
            id: 1,
            name: 'Cable 2',
            capacity: 50,
        }

        const result = cableSchema.safeParse(invalidCableData)
        expect(result.success).to.be.false
    })

    it('should fail validation for invalid latitude and longitude', () => {
        const invalidCableData = {
            id: 1,
            name: 'Cable 3',
            capacity: 50,
            boxes_connected: [1, 2],
            path: [
                { lat: 91, lng: -74.006 },
                { lat: 34.0522, lng: -181 },
            ],
        }

        const result = cableSchema.safeParse(invalidCableData)
        expect(result.success).to.be.false
    })
})
