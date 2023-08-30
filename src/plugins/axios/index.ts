import { isArray, isFunction } from "@/utils";
import axios, { AxiosInstance, CreateAxiosDefaults,AxiosInterceptorOptions } from "axios";

const defaultOptions: CreateAxiosDefaults<any> = {};

const http = axios.create({});

class Axios {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({});
    this.instance.interceptors.request.use();
  }

  getInstance() {
    return this.instance;
  }

  ((value: V) => V | Promise<V>) | null,
  ((error: any) => any) | null,
  AxiosInterceptorOptions
  
  setupInterceptors({ request: [][], response }): void {
    // if (isArray(request)) {
    //   for (const interceptor of request) {
    //     this.instance.interceptors.request.use();
    //   }
    // } else if (isFunction(request)) this.instance.interceptors.request.use();
  }
}
