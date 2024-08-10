import axios from 'axios'

export class API {
  #axios = null;
  #baseUrl = 'http://localhost:3333'

  constructor(prefix) {
    const instance = axios.create({
      baseURL: `${this.#baseUrl}/${prefix}`
    })

    this.#axios = instance
  }

  get(url) {
    return this.#axios.get(url)
  }

  post(url, data) {
    return this.#axios.post(url, data)
  }

  put(url, data) {
    return this.#axios.put(url, data)
  }

  delete(url) {
    return this.#axios.delete(url)
  }
}
