import mongoose from 'mongoose'
import { z } from 'zod'

export const boxSchema = z.object({
    externalSourceId: z.number().min(1),
    externalLoadId: z.string().min(1),
    name: z.string().min(1).max(255),
    typeName: z.string().min(1).max(255),
    coordinates: z
        .tuple([z.number(), z.number()])
        .refine(
            (arr) => {
                const [lat, lng] = arr
                return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
            },
            {
                message:
                    'Latitude must be between -90 and 90, Longitude must be between -180 and 180.',
            },
        )
        .optional(),
})

export const updateBoxSchema = z.object({
    params: z.object({
        id: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data), {
            message: 'Invalid id',
        }),
    }),
    body: boxSchema.partial(),
})

export type BoxSchema = z.infer<typeof boxSchema>
export type updateBoxSchema = z.infer<typeof updateBoxSchema>
