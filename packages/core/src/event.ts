import type { VisitorInfo } from './types'
import { isValidEventKey } from './utils'

interface Product {
  price: number
  qnt: number
  product_id?: number | string
  product_name?: string
  product_url?: string
  product_image_url?: string
}

interface UpdateCartOptions {
  items: Product[]
}

interface PurchaseOptions {
  /** id заказа (уникальное значение) */
  order_id: number | string
  /** полная стоимость заказа с учетом стоимости доставки и скидок */
  revenue: number
  /** id наименования товара */
  product_id: number | string
  /** Количество товаров */
  qnt: number
  /** Цена */
  price: number
  /** Адрес страницы товара */
  product_url?: string
  /** Изображение товара */
  product_image_url?: string
  /** Cтатус заказа */
  state?: string
  /** Список товаров в заказе */
  items: Product[]
}

interface OrderUpdateOptions {
  /** id заказа (уникальное значение) */
  order_id: number | string
  /** статус заказа */
  state: string
  /** полная стоимость заказа с учетом стоимости доставки и скидок */
  revenue?: number
  /** массив из списка товаров в заказе */
  items?: Product[]
  /** id наименования товара */
  product_id: number | string
  /** количество товаров */
  qnt: number
  /** цена */
  price: number
}

interface FileDownloadOptions {
  file_url: string
  file_title: string
}

interface ViewProductOptions {
  product_id: number | string
  product_name?: string
  /** id раздела, в котором расположен товар */
  category_id?: number | string
  /** адрес страницы с товаром */
  product_url?: string
  price?: number
  product_image_url?: string
}

export class EventClient {
  /**
   * Используйте собственные события, чтобы отслеживать нужные параметры поведения посетителей.
   * @param key - уникальный идентификатор события (только буквы латинского алфавита, цифры и нижнее подчеркивание).
   * @example
   *  Вы можете отправить событие в Convead в любой момент. Например, вызвать следующий код при заходе пользователя на страницу или нажатии на кнопку/ссылку
   * ```ts
   * convead.event.custom('event_key');
   * ```
   */
  public custom(key: string) {
    if (!isValidEventKey(key)) {
      console.warn('[conveadjs] invalid custom event key')
      return
    }

    window.convead('event', 'custom', { key })
  }

  /**
   * Открытие новой страницы с указанием «ключевой страницы».
   */
  public link(options?: { key_page_id?: number }) {
    window.convead('event', 'link', options)
  }

  /**
   * Скачивание файла.
   */
  public fileDownlaod(options: FileDownloadOptions) {
    window.convead('event', 'file', options)
  }

  /**
   * Передача e-mail.
   */
  public mailto(options: { email: string }) {
    window.convead('event', 'mailto', options)
  }

  /**
   * Передает событие покупки.
   * @param options
   */
  public purchase(options: PurchaseOptions, visitor: VisitorInfo) {
    window.convead('event', 'purchase', options, visitor)
  }

  /**
   * Обновление статуса заказа
   */
  public orderUpdate(options: OrderUpdateOptions) {
    window.convead('event', 'order_update', options)
  }

  /**
   * Передает полный состав корзины.
   * @remark Если корзина очищена, то отправляется с пустым массивом `items: []`.
   */
  public updateCart(options: UpdateCartOptions) {
    window.convead('event', 'update_cart', options)
  }

  /**
   * Используется для изменения данных посетителя.
   * @description Последним параметром передается объект `Visitor`, который содержит информацию о посетителе.
   */
  public updateInfo(visitor: VisitorInfo) {
    window.convead('event', 'update_info', {}, visitor)
  }

  /**
   * Передает информацию о просмотренном товаре.
   */
  public viewProduct(options: ViewProductOptions) {
    window.convead('event', 'view_product', options)
  }
}
