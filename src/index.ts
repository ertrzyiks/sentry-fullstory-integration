import { Event, EventProcessor, Hub, Integration } from '@sentry/types'

/**
 * Based on the built-in integrations from Sentry SDK
 * https://github.com/getsentry/sentry-javascript/tree/0df0db1b1f1dd88ff1f3069d8356a17f5b6b1129/packages/integrations
 *
 * The FullStory service (https://www.fullstory.com/) provides a snippet that must be included on the page for this
 * integration to work.
 *
 * `FS.getCurrentSessionURL` may return null or not be present at all when:
 *  - the event happens too early
 *  - the user prevents FullStory snippet from loading
 *  - the website domain is not allowed for the used org key
 */
export class FullStorySessionIntegration implements Integration {
  public name: string = FullStorySessionIntegration.id

  public static id = 'FullstorySessionIntegration'

  public setupOnce(
    addGlobalEventProcessor: (callback: EventProcessor) => void,
    getCurrentHub: () => Hub
  ): void {
    addGlobalEventProcessor(event => {
      const self = getCurrentHub().getIntegration(FullStorySessionIntegration)

      if (!self) {
        return event
      }

      return self.enhanceEventFullstorySessionUrl(event)
    })
  }

  protected enhanceEventFullstorySessionUrl(event: Event): Event {
    /**
     * The signature of the FS method is
     *
     *   FS.getCurrentSessionURL(now: boolean)
     *
     * we pass `true` to get the URL pointing to the exact moment of calling the method.
     */
    const fullStorySessionUrl = window.FS?.getCurrentSessionURL?.(true)

    if (fullStorySessionUrl) {
      event.contexts = event.contexts ?? {}
      event.contexts.FullStory = {
        sessionUrl: fullStorySessionUrl
      }
    }

    return event
  }
}
