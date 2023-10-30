import { AxiosInterceptorOptions, AxiosRequestConfig, AxiosResponse } from "axios";

/** # 请求自定义配置*/
interface HttpCustomOptions {
  /** # 是否携带token */
  withToken?: boolean;
  /** # 是否可取消 */
  withCancelToken?: boolean;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  _customOptions?: HttpCustomOptions;
}

export type XAxiosInterceptorOptions<V> = [((value: V) => V | Promise<V>) | null, ((error: any) => any) | null, AxiosInterceptorOptions?];

export type XAxiosResponseInterceptorOptions<V> = [
  ((value: V) => V | Promise<V>) | ((value: V) => [boolean, any, V] | Promise<[boolean, any, V]>) | null,
  ((error: any) => any) | null,
  AxiosInterceptorOptions?
];
export interface SetupInterceptorArgs {
  request: XAxiosInterceptorOptions<CreateAxiosOptions>[] | XAxiosInterceptorOptions<CreateAxiosOptions>;

  response: XAxiosResponseInterceptorOptions<AxiosResponse>[] | XAxiosResponseInterceptorOptions<AxiosResponse>;
}

export type Response<T> = Promise<[boolean, { message: any; data: T }, AxiosResponse<T>]>;
