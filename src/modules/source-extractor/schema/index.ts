import { z } from 'zod'
import { boxSchema } from './box-schema'
import { cableSchema } from './cable-schema'
import { customerSchema } from './customer-schema'
import { dropCableSchema } from './drop-cable-schema'

export type BoxSchema = z.infer<typeof boxSchema>
export type CableSchema = z.infer<typeof cableSchema>
export type CustomerSchema = z.infer<typeof customerSchema>
export type DropCableSchema = z.infer<typeof dropCableSchema>
