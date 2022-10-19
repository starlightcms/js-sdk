import { beforeEach, afterEach, afterAll } from 'vitest'
import { fetch } from 'cross-fetch'
import { server } from './mocks/server'

// Polyfill fetch
global.fetch = fetch

beforeEach(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => server.close())
