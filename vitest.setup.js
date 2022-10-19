import { fetch } from 'cross-fetch'

// Polyfill fetch
global.fetch = fetch
