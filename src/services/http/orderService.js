import { API } from "../../lib/axios";

export class OrderService {
  constructor(api) {
    this.api = api;
  }

  listOrders() {
    return this.api.get()
  }

  createOrder(data) {
    return this.api.post(data)
  }

  updateOrder(data) {
    return this.api.put(data)
  }

  deleteOrder(id) {
    return this.api.delete(id)
  }
}

const api = new API()
export const clientService = new OrderService(api)
