import { z } from 'zod'

export const boxSchema = z.object({
    id: z.number().min(1),
    name: z.string().min(1).max(255),
    type: z.string().min(1).max(255),
    lat: z.number(),
    lng: z.number(),
})
