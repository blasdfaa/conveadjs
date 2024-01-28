import type { WindowConveadFunction, WindowConveadSettings } from './types'

declare global {
  interface Window {
    ConveadLib: any
    ConveadClient: any
    ConveadSettings: {
      /**
       * uid зарегистрированного пользователя (для гостя не указывается).
       * @description se only [0-9a-z-] characters for visitor uid!
       */
      visitor_uid?: string
      visitor_info: Partial<{
        first_name: string
        last_name: string
        email: string
        phone: string
        date_of_birth: string
        gender: string
        [key: string]: any
      }>
      /** unique UID identifier of the guest */
      guest_uid?: string
      app_key: string
      /**
       * Метод, вызываемый после загрузки скрипта до инициализации.
       */
      onload?(): void
      /**
       * Метод, вызываемый в момент инициализации.
       */
      onready?(): void
      /**
       * Метод, вызываемый в момент отправки любого эвента.
       */
      onevent?(eventName: string, properties: any, visitorInfo: VisitorInfo, attributes: any): void
      /**
       * При значении `true` отключает чат.
       */
      disable_chat?: boolean
      /**
       * При значении `true` отключает автоматическую отправку эвента `link`.
       */
      disable_auto_event_link?: boolean
      /**
       * При значении `true` отключает отправку эвента `link` при смене адреса страницы с помощью js без физической перезагрузки страницы.
       */
      disable_state_event_link?: boolean
      debug_mode?: boolean
    }
    convead: WindowConveadFunction
  }
}
