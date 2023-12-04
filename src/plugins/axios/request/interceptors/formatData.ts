import { AxiosResponse } from "axios";

/**
 * # 处理响应错误情况的数据格式
 * @param err
 * @returns [true, response.data, response]
 */
export function dealWithResponseErr(err: any): [true, any, any] {
  const response = err?.response || {};
  const { data } = response;
  return [true, data, response];
}

/**
 * # 处理响应正确情况的数据格式
 * @param res
 * @returns [false, response.data, response]
 */
export function dealWithResponseSuccess(res: AxiosResponse): [false, any, AxiosResponse] {
  return [false, res?.data, res];
}
