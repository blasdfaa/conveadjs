interface CloseWidgetOptions {
  /**
   * id виджета, который нужно закрыть/свернуть.
   */
  id: number
  /**
   * Тип виджетов, которые нужно закрыть/свернуть
   */
  display_type?: 'manual' | 'auto'
}

interface ShowWidgetOptions {
  /**
   * id виджета, который нужно показать.
   */
  id?: number
  /**
   * Вызывает функцию в момент показа виджета и передает в нее переменную el с содержимым виджета.
   */
  onComplete?: (el: HTMLElement) => void
  /**
   * При значении `false` запрещает закрывать виджет. При этом иконка закрытия/сворачивания видна не будет.
   */
  allowClose?: boolean
}

export class WidgetClient {
  /**
   * Для типов виджетов: Popup, Notice — происходит закрытие.
   * Для типов виджетов: TopBar, BottomBar — сворачивание.
   */
  public close(options?: CloseWidgetOptions) {
    window.convead('widget', 'close', options)
  }

  /**
   * Работает только для ручных виджетов.
   */
  public show(options?: ShowWidgetOptions) {
    const { id, allowClose, onComplete } = options ?? {}
    window.convead('widget', 'show', { id, allow_close: allowClose, on_complete: onComplete })
  }
}
