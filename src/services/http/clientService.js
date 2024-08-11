import { API } from "../../lib/axios";

export class ClientService {
  constructor(api) {
    this.api = api;
  }

  listClients() {
    return this.api.get('').then(x => x.data)
  }

  createClient(data) {
    return this.api.post('',data).then(x => x.data)
  }

  updateClient(data) {
    return this.api.put(data.id, data).then(x => x.data)
  }

  deleteClient(id) {
    return this.api.delete(id)
  }
}

const api = new API('clientes')
export const clientService = new ClientService(api)
