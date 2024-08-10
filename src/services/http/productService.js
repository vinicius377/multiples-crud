import { API } from "../../lib/axios";

export class ProductService {
  constructor(api) {
    this.api = api;
  }

  listProducts() {
    return this.api.get()
  }

  createProduct(data) {
    return this.api.post(data)
  }

  updateProduct(data) {
    return this.api.put(data)
  }

  deleteProduct(id) {
    return this.api.delete(id)
  }
}

const api = new API()
export const productService = new ProductService(api)
