export * from "./interface";
export * from "./whiteList";
export * from "./utils";
import { AxiosResponse } from "axios";
import { CreateAxiosOptions } from "../../types";
import { RequestStore } from "./requestStore";
import { GenerateReqKeyData } from "./interface";

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
    requestStore.set(config, controller, cancelReq);
  }
  return config;
}

function cancelReq(controller: AbortController) {
  controller.abort();
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
  const { config } = err?.response || {};
  requestStore.delete(config);
  return Promise.reject(err);
}

/**
 * ## 手动取消请求
 */
export function cancelReqManual(data: GenerateReqKeyData) {
  const controller = requestStore.get(data);
  if (controller) {
    cancelReq(controller);
  }
}
