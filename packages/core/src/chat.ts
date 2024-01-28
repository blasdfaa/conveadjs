export class ChatClient {
  /**
   * Развернуть окно чата.
   */
  public show() {
    window.convead('module', 'chat', { method: 'show' })
  }

  /**
   * Свернуть окно чата.
   */
  public hide() {
    window.convead('module', 'chat', { method: 'hide' })
  }
}
