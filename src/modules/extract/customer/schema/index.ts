import { z } from 'zod'

export const customerSchema = z.object({
    id: z.number().min(1),
    name: z.string().min(1).max(255),
    code: z.string().min(1).max(255),
    address: z.string().min(1).max(255),
    box_id: z.number().min(1),
})

export type CustomerSchema = z.infer<typeof customerSchema>
