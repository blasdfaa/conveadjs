import { createConvead, loadScript } from '@conveadjs/core'

const convead = createConvead(
  {
    appKey: '',
  },
  {
    debug: true,
  },
)

loadScript({ appKey: '' })

const products = [{ price: 123, qnt: 1 }]
const order = {
  items: products,
  order_id: 1,
  price: 123,
  product_id: 123,
  qnt: 123,
  revenue: 123,
}
const visitor = {
  dateOfBirth: '2000-01-01',
  email: 'foo@mail.com',
  firstName: 'Foo',
  gender: 'male',
  lastName: 'Bar',
  phone: '111-111-111s',
}

document.querySelector('#custom')!.addEventListener('click', () => convead.event.custom('my_custom_event'))
document.querySelector('#link')!.addEventListener('click', () => convead.event.link())
document.querySelector('#fileDownlaod')!.addEventListener('click', () => convead.event.fileDownlaod({ file_title: 'foo', file_url: 'http://localhost:5173/vite.svg' }))
document.querySelector('#mailto')!.addEventListener('click', () => convead.event.mailto({ email: 'foo@mail.com' }))
document.querySelector('#purchase')!.addEventListener('click', () => convead.event.purchase(order, visitor))
document.querySelector('#orderUpdate')!.addEventListener('click', () => convead.event.orderUpdate({ ...order, state: 'fqefqe' }))
document.querySelector('#updateCart')!.addEventListener('click', () => convead.event.updateCart(order))
document.querySelector('#updateInfo')!.addEventListener('click', () => convead.event.updateInfo(visitor))
document.querySelector('#viewProduct')!.addEventListener('click', () => convead.event.viewProduct({ product_id: '1' }))

document.querySelector('#show-chat')!.addEventListener('click', () => convead.chat.show())
document.querySelector('#hide-chat')!.addEventListener('click', () => convead.chat.hide())

document.querySelector('#enable-traking')!.addEventListener('click', () => convead.tracking.enable())
document.querySelector('#disable-traking')!.addEventListener('click', () => convead.tracking.disable())

document.querySelector('#show-widget')!.addEventListener('click', () => convead.widget.show())
document.querySelector('#close-widget')!.addEventListener('click', () => convead.widget.close())
