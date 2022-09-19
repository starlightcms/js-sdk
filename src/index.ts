import { makeClient } from './client'
export { StarlightError } from './errors'
export * from './types'

/**
 * This is the default object exported by the SDK module, which is a
 * pre-created {@link StarlightClient}. In the docs, this is called the "global
 * SDK client". If your application only requests data from a single Starlight
 * workspace, using this client is easier than creating
 * a new one using {@link makeStarlightClient}.
 *
 * Using the default client is as easy as importing the SDK:
 *
 * ```ts
 * // "Starlight" below is the default client.
 * import Starlight from '@starlightcms/js-sdk'
 *
 * const response = await Starlight.posts.entries.list()
 * ```
 *
 * You need to configure the default workspace before using it.
 * See {@apilink StarlightClient.configure} to learn more.
 *
 * @group Client
 */
const Starlight = makeClient()

export { makeClient as makeStarlightClient }

export default Starlight
