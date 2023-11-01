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

type Resolve<T> = (value: T) => T | Promise<T>;
type TransFormRes<T> = (value: T) => [boolean, any, T] | Promise<[boolean, any, T]>;

type XAxiosInterceptorManager<V, T = null> = [V | T | null, ((error: any) => any) | null, AxiosInterceptorOptions?];

export interface SetupInterceptorArgs {
  request: XAxiosInterceptorManager<Resolve<CreateAxiosOptions>>[];
  response: XAxiosInterceptorManager<Resolve<AxiosResponse>, TransFormRes<AxiosResponse>>[];
}

export type Response<T> = Promise<[boolean, { message: any; data: T }, AxiosResponse<T>]>;
