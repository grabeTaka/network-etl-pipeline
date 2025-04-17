import { z } from 'zod'

export const cableSchema = z.object({
    id: z.number().min(1),
    name: z.string().min(1).max(255),
    capacity: z.number().min(1),
    boxes_connected: z.tuple([z.number(), z.number()]),
    path: z.array(
        z.object({
            lat: z.number(),
            lng: z.number(),
        }),
    ),
})
