import { makeClient } from './client'
export { StarlightError } from './errors'
export * from './types'

const Starlight = makeClient()

export { makeClient as makeStarlightClient }

export default Starlight
