import { AxiosInterceptorOptions, AxiosRequestConfig, AxiosResponse } from "axios";

export type XAxiosInterceptorOptions<V> = [((value: V) => V | Promise<V>) | null, ((error: any) => any) | null, AxiosInterceptorOptions?];

export interface CreateAxiosOptions extends AxiosRequestConfig {
  _customOptions?: HttpCustomOptions;
}

interface HttpCustomOptions {
  // 是否携带token
  withToken?: boolean;
  // 是否可取消
  withCancelToken?: boolean;
}

export interface SetupInterceptorArgs {
  request: XAxiosInterceptorOptions<CreateAxiosOptions>[] | XAxiosInterceptorOptions<CreateAxiosOptions>;

  response: XAxiosInterceptorOptions<AxiosResponse>[] | XAxiosInterceptorOptions<AxiosResponse>;
}
