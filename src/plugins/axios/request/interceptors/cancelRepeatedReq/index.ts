export * from "./interface";
export * from "./whiteList";
export * from "./utils";
import { AxiosResponse } from "axios";
import { CreateAxiosOptions } from "../../types";
import { RequestStore } from "./requestStore";

const requestStore = new RequestStore();

/**
 * # 处理重复请求
 * @param config
 * @returns
 */
export function dealWithRepeatedReq(config: CreateAxiosOptions) {
  // 如果之前存在该请求，需要取消之后的请求
  if (config) {
    const controller = new AbortController();
    config.signal = controller.signal;
    requestStore.set(config, controller);
  }
  return config;
}

/**
 * ## 请求成功，将请求记录从store中移除
 * @param res
 */
export function removeRepeatedReq(res: AxiosResponse) {
  requestStore.delete(res.config);
  return res;
}

/**
 * ## 请求失败，将请求记录从store中移除
 */
export function removeRepeatedReqErr(err: any) {
  console.log(err);
  const { config, name } = err?.response || {};
  requestStore.delete(config);
  if (name === "CanceledError") {
    // 错误名称
  }

  return Promise.reject(err);
}
