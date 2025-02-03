import { type SchemaTypeDefinition } from 'sanity'
import cars from './cars'
import booking from './booking'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [cars , booking],
}
