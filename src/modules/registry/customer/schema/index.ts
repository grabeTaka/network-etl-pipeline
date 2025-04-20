import mongoose from 'mongoose'
import { z } from 'zod'

export const customerSchema = z.object({
    _id: z.string().optional(),
    externalSourceId: z.number().min(1),
    externalLoadId: z.string().min(1),
    name: z.string().min(1).max(255),
    externalLoadBoxId: z.string().min(1).max(255)
})

export const updateCustomerSchema = z.object({
    params: z.object({
        id: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data), {
            message: 'Invalid id',
        }),
    }),
    body: customerSchema.partial(),
})

export type CustomerSchema = z.infer<typeof customerSchema>
export type updateCustomerSchema = z.infer<typeof updateCustomerSchema>
