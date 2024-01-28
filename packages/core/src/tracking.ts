export class TrackingClient {
  /** Отключить трекинг. */
  public disable() {
    window.convead('tracking', 'disable')
  }

  /** Включить трекинг. */
  public enable() {
    window.convead('tracking', 'enable')
  }
}
