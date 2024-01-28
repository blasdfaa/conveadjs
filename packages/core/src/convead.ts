import { ChatClient } from './chat'
import { EventClient } from './event'
import { TrackingClient } from './tracking'
import type { ConveadSettings, Options } from './types'
import { hasScript } from './utils'
import { WidgetClient } from './widget'

export class ConveadClient {
  public chat: ChatClient
  public widget: WidgetClient
  public event: EventClient
  public tracking: TrackingClient

  constructor(
    private readonly options: Options,
    private readonly conveadOptions?: ConveadSettings,
  ) {
    if (hasScript()) {
      console.warn('[conveadjs] create the client before loading the script. Please ensure that you initialize the client before calling any script-related functions.')
      return
    }

    if (!options.appKey) {
      console.warn('[conveadjs] cannot be initialized, please specify appKey')
      return
    }

    this.chat = new ChatClient()
    this.widget = new WidgetClient()
    this.event = new EventClient()
    this.tracking = new TrackingClient()

    this.initCoveadSettings()
  }

  private initCoveadSettings() {
    if (typeof document === 'undefined')
      return

    const {
      dateOfBirth,
      email,
      firstName,
      gender,
      lastName,
      phone,
      ...customFields
    } = this.options.visitor ?? {}
    const { debug } = this.conveadOptions ?? { debug: false }
    window.ConveadSettings ||= {
      app_key: this.options.appKey,
      debug_mode: !!debug,
      visitor_info: {
        email,
        gender,
        phone,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        ...customFields,
      },
      visitor_uid: this.options.visitorUid,
    }
  }
}

export function createConvead(options: Options, conveadOptions?: ConveadSettings) {
  return new ConveadClient(options, conveadOptions)
}
