import { API } from "../../lib/axios";

export class ProductService {
  constructor(api) {
    this.api = api;
  }

  listProducts() {
    return this.api.get('').then(x => x.data)
  }

  createProduct(data) {
    return this.api.post('',data).then(x => x.data)
  }

  updateProduct(data) {
    console.log(data)
    return this.api.put(data.id,data).then(x => x.data)
  }

  deleteProduct(id) {
    return this.api.delete(id)
  }
}

const api = new API('produtos')
export const productService = new ProductService(api)
