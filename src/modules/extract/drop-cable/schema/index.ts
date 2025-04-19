import { z } from 'zod'

export const dropCableSchema = z.object({
    id: z.number().min(1),
    name: z.string().min(1).max(255),
    box_id: z.number().min(1),
    customer_id: z.number().min(1),
})

export type DropCableSchema = z.infer<typeof dropCableSchema>
