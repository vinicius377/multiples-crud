import { API } from "../../lib/axios";

export class OrderService {
  constructor(api) {
    this.api = api;
  }

  listOrders() {
    return this.api.get('').then(x => x.data)
  }

  createOrder(data) {
    return this.api.post('', data).then(x => x.data)
  }

  updateOrder(data) {
    return this.api.put(data.id, data).then(x => x.data)
  }

  deleteOrder(id) {
    return this.api.delete(id)
  }
}

const api = new API('pedidos')
export const orderService = new OrderService(api)
