/* eslint-disable @typescript-eslint/no-explicit-any */
import { INVENTORY_URL } from '@/configs/constance'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

export const defaultHeader = { Accept: 'application/json', 'Content-Type': 'application/json' }

function responseBody<T>(res: AxiosResponse<T>) {
  return res.data
}

export default class ApiQuery {
  root: string
  config: AxiosRequestConfig

  constructor(rootUrl: string, config?: AxiosRequestConfig) {
    this.root = rootUrl
    if (config) {
      this.config = config
      if (!this.config?.headers) this.config.headers = {}
      this.config['headers'] = { ...this.config['headers'], ...defaultHeader }
    } else this.config = { headers: defaultHeader }
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    return await axios
      .get(`${this.root}${url}`, { ...config, ...this.config })
      .then<T>(responseBody)
  }

  async post<T = any, B = any>(url: string, data?: B, config?: AxiosRequestConfig) {
    return await axios
      .post(`${this.root}${url}`, data, { ...config, ...this.config })
      .then<T>(responseBody)
  }

  async put<T = any, B = any>(url: string, data?: B, config?: AxiosRequestConfig) {
    return await axios
      .put(`${this.root}${url}`, data, { ...config, ...this.config })
      .then<T>(responseBody)
  }

  async del<T = any>(url: string, config?: AxiosRequestConfig) {
    return await axios
      .delete(`${this.root}${url}`, { ...config, ...this.config })
      .then<T>(responseBody)
  }
}

export const inventoryQuery = new ApiQuery(INVENTORY_URL)
