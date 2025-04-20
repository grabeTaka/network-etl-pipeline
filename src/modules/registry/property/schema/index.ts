import mongoose from 'mongoose'
import { z } from 'zod'

export const propertySchema = z.object({
    _id: z.string().optional(),
    externalSourceId: z.number().min(1),
    externalLoadId: z.string().min(1),
    name: z.string().min(1).max(255),
    code: z.string().min(1).max(255),
    boxId: z.string().min(1).max(255),
})

export const updatePropertySchema = z.object({
    params: z.object({
        id: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data), {
            message: 'Invalid id',
        }),
    }),
    body: propertySchema.partial(),
})

export type PropertySchema = z.infer<typeof propertySchema>
export type updatePropertySchema = z.infer<typeof updatePropertySchema>
