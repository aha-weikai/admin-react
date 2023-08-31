import { AxiosInterceptorOptions, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export type XAxiosInterceptorOptions<V> = [((value: V) => V | Promise<V>) | null, ((error: any) => any) | null, AxiosInterceptorOptions?];

export interface SetupInterceptorArgs {
  request: XAxiosInterceptorOptions<InternalAxiosRequestConfig>[] | XAxiosInterceptorOptions<InternalAxiosRequestConfig>;

  response: XAxiosInterceptorOptions<AxiosResponse>[] | XAxiosInterceptorOptions<AxiosResponse>;
}
