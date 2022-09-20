<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/website/static/img/sdk-header-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="/website/static/img/sdk-header.svg">
  <img alt="Starlight JS SDK logo" src="/website/static/img/sdk-header.svg">
</picture>

# Starlight JavaScript SDK

This is the official Starlight SDK for websites and JavaScript applications, which makes integrating Starlight
content into your apps a real breeze.

You can read the usage guide and the API reference in [its documentation page](https://js.sdk.starlight.sh).

## Quick Start

To quickly start using the JS SDK, install it into your project:

```shell
npm install @starlightcms/js-sdk
```

Then, import the SDK and configure which Starlight workspace it should request data from:

```js
import Starlight from '@starlightcms/js-sdk'

Starlight.configure({
  workspace: '1234567890'
})
```

And, finally, start requesting data:

```js
import Starlight from '@starlightcms/js-sdk'

// Listing all entries from the 'posts' model.
const response = Starlight.posts.entries.list()

// Getting content from the 'hello-world' entry.
const response = Starlight.posts.entries.get('hello-world')
```

The SDK is capable of requesting a myriad of different content from your workspaces. Check out 
[the documentation](https://js.sdk.starlight.sh/docs/intro) to learn more.

## React SDK

If you use React on your application, take a look at [the Starlight React SDK](https://github.com/starlightcms/react-sdk).
It's based in the JS SDK, and also provide useful React components to simplify content and image rendering.

## Issues

If you have any questions or you're facing any issues with the SDK, feel free to [open an issue](https://github.com/starlightcms/js-sdk/issues).
