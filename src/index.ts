import { makeClient } from 'client'
export { DefaultModelDefinition } from 'types'
export { StarlightError } from 'errors'
export * from 'types/fields'
export * from 'types/visual'

const Starlight = makeClient()

export { makeClient as makeStarlightClient }

export default Starlight
