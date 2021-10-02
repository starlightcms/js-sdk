import { makeClient } from './client'
export { DefaultModelDefinition, WorkspaceModelDefinition } from './types'

const Starlight = makeClient()

export { makeClient as makeStarlightClient }

export default Starlight
