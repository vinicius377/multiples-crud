import { API } from "../../lib/axios";

export class ClientService {
  constructor(api) {
    this.api = api;
  }

  listClients() {
    return this.api.get()
  }

  createClient(data) {
    return this.api.post(data)
  }

  updateClient(data) {
    return this.api.put(data)
  }

  deleteClient(id) {
    return this.api.delete(id)
  }
}

const api = new API()
export const clientService = new ClientService(api)
