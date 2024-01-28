export type EventTypes =
  'add_to_cart' |
  'chat_assign_manager' |
  'chat_change_manager' |
  'chat_close_conversation' |
  'chat_form_decline' |
  'chat_form_submit' |
  'chat_internal_msg' |
  'chat_manager_msg' |
  'chat_reopen_conversation' |
  'chat_trigger_form' |
  'chat_trigger_offer' |
  'chat_trigger_text' |
  'chat_visitor_msg' |
  'click_email' |
  'custom' |
  'double_optin' |
  'file' |
  'fire_chat_trigger' |
  'link' |
  'login' |
  'logout' |
  'mailto' |
  'open_email' |
  'order_update' |
  'purchase' |
  'remove_from_cart' |
  'send_email' |
  'subscribe' |
  'unsubscribe' |
  'update_cart' |
  'update_info' |
  'view_product' |
  'web_push_click' |
  'web_push_send' |
  'web_push_show' |
  'web_push_subscribe' |
  'web_push_unsubscribe' |
  'widget_close' |
  'widget_submit' |
  'widget_view' |
  'key_page_link'

export type WidgetMethods = 'show' | 'hide'
export type TrackingTypes = 'enable' | 'disable'

export interface CustomEventParams {
  key: string
}

export interface EventProductData {
  product_id: string
  qnt: number
  price: number
}

export interface ViewProductEventParams {
  product_id: string
  product_name: string
  product_url: string
}

export interface UpdateCartEventParams {
  items: EventProductData[]
}

export interface PurchaseEventParams {
  order_id: string
  revenue: number
  items: EventProductData[]
}

export interface PurchaseEventBuyerData {
  first_name: string
  last_name: string
  email: string
  phone: string
}

export interface WindowConveadFunction {
  (method: 'module', type: 'chat', params: { method: WidgetMethods }): void

  (method: 'tracking', type: TrackingTypes): void

  (method: 'event', type: 'add_to_cart', ...params: any[]): void
  (method: 'event', type: 'view_product', ...params: any[]): void
  (method: 'event', type: 'update_cart', ...params: any[]): void
  (method: 'event', type: 'purchase', ...params: any[]): void
  (method: 'event', type: 'order_update', ...params: any[]): void
  (method: 'event', type: 'update_info', ...params: any[]): void
  (method: 'event', type: 'custom', ...params: any[]): void
  (method: 'event', type: 'file', ...params: any[]): void
  (method: 'event', type: 'link', ...params: any[]): void
  (method: 'event', type: 'mailto', ...params: any[]): void

  (method: 'widget', type: 'close', params?: { id?: number, display_type?: 'manual' | 'auto' }): void
  (method: 'widget', type: 'show', params: { id?: number, on_complete?: (el: HTMLElement) => void, allow_close?: boolean }): void

}

export interface VisitorInfo {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  dateOfBirth?: string
  gender?: string
}

export interface ConveadSettings {
  debug?: boolean
}

export interface LoadScriptOptions {
  appKey: string
  /**
   * Whether to load Convead script asynchronously or defer its loading.
   * @default 'defer'
   */
  loadingStrategy?: 'async' | 'defer'
  /**
   * Where to append the script element.
   * @default document.head
   */
  parentElement?: HTMLElement
}

export interface Options {
  appKey: string
  visitorUid?: string
  /**
   * Объект с информацией о посетителе.
   * Если каких-то данных нет, то их не нужно объявлять вообще в данном объекте, в противном случае они заменят уже существующие в конвиде.
   * Может содержать в себе только переменные с известными данными.
   * @remark Передача значения в качестве пустой строки (например `first_name: ""`) вызовет стирание известных данных о посетителе в Convead, что приведет к потере информации.
   * @default {}
   */
  visitor?: VisitorInfo
  options?: ConveadSettings
}
