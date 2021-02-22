# sentry-fullstory-integration

[It's a pluggable integration](https://docs.sentry.io/platforms/javascript/#sdk-integrations) for Sentry SDK.

Extend a Sentry event report with a link to the corresponding [FullStory](http://fullstory.com/) session, pointing
to the exact moment the event happened. The recording captures how that error impacted the user and let's rewind
into the past to see what actions took user to trigger the error.

It assumes that the FullStory SDK is initialized by the app. It does not inject the integration snippet.

## How to install

```js
yarn add @ertrzyiks/sentry-fullstory-integration
```

## Usage

```js
import Sentry from '@sentry/browser'
import { FullStorySessionIntegration } from '@ertrzyiks/sentry-fullstory-integration'

Sentry.init({
  dsn: ...,
  integrations: [
    new FullStorySessionIntegration()
  ]
})
```

## Troubleshooting

**Problem:** part of the `sessionUrl` link is replaced by `[Filtered]` in the Sentry dashboard

**Solution:** Sentry tries to find sensitive information submitted via error reports, so it replaces it with the `[Filtered]` string. 
The solution is described [here](https://help.sentry.io/hc/en-us/articles/115000154594-Why-am-I-seeing-Filtered-in-my-event-data-) 
(in brief the Sentry project needs to be customized to allow `sessionUrl` as **Safe Field** in **Security & Privacy** project settings section).
