import mongoose from 'mongoose'
import { z } from 'zod'

export const cableSchema = z.object({
    _id: z.string().optional(),
    externalSourceId: z.number().min(1),
    externalLoadId: z.string().min(1),
    name: z.string().min(1).max(255),
    path: z.array(
        z.object({
            lat: z.number(),
            lng: z.number(),
        }),
    ),
    boxConnected: z.tuple([z.string(), z.string()]),
})

export const updateCableSchema = z.object({
    params: z.object({
        id: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data), {
            message: 'Invalid id',
        }),
    }),
    body: cableSchema.partial(),
})

export type CableSchema = z.infer<typeof cableSchema>
export type updateCableSchema = z.infer<typeof updateCableSchema>
