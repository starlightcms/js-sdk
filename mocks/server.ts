import { setupServer } from 'msw/node'
import { createHandlers } from './handlers'

const handlers = createHandlers()

export const server = setupServer(...handlers)
