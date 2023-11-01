import { AxiosInterceptorOptions, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

/** # 请求自定义配置*/
interface HttpCustomOptions {
  /** # 是否携带token */
  withToken?: boolean;
  /** # 是否可取消 */
  withCancelToken?: boolean;
}
/**
 * ## 请求配置，增加了一个自定义字段 _customOptions
 */
export interface CreateAxiosOptions extends AxiosRequestConfig {
  _customOptions?: HttpCustomOptions;
}

type XAxiosInterceptorOptions<V> = [((value: V) => V | Promise<V>) | null, ((error: any) => any) | null, AxiosInterceptorOptions?];

type XAxiosResponseInterceptorOptions<V> = [
  ((value: V) => V | Promise<V>) | ((value: V) => [boolean, any, V] | Promise<[boolean, any, V]>) | null,
  ((error: any) => any) | null,
  AxiosInterceptorOptions?
];
export interface SetupInterceptorArgs {
  request: XAxiosInterceptorOptions<CreateAxiosOptions>[];
  response: XAxiosResponseInterceptorOptions<AxiosResponse>[];
}

export type Response<T> = Promise<[boolean, { message: any; data: T }, AxiosResponse<T>]>;
