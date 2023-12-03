import Qs from "qs";
import { CreateAxiosOptions } from "../types";

class RequestStore {
  private store: Map<string, AbortController>;
  private whiteList: WhiteList;
  constructor() {
    this.store = new Map();
    this.whiteList = new WhiteList();
  }

  set(config: GenerateReqKeyData, controller: AbortController) {
    const isInWhiteList = this.getIsInWhiteList(config);
    if (isInWhiteList) {
      const isNeed = this.getIsNeedDealInWL(config);
      if (isNeed) {
        const key = generateReqKey(config);
        this.store.set(key, controller);
      }
    } else {
      const key = generateReqKey(config);
      this.store.set(key, controller);
    }
  }

  delete(config: GenerateReqKeyData) {}

  getIsInWhiteList(config: GenerateReqKeyData) {
    const key = this.whiteList.generateKey(config);
    return this.whiteList.has(key);
  }

  /**
   * ## 判断请求在白名单中是否需要进行重复处理
   */
  private getIsNeedDealInWL(config: GenerateReqKeyData) {
    const key = this.whiteList.generateKey(config);
    return this.whiteList.get(key);
  }

  setupWhiteList(data: GenerateReqKeyData[]) {
    this.whiteList.setupWhiteList(data);
  }
}
export const requestStore = new RequestStore();

/**
 * # 处理重复请求
 * @param config
 * @returns
 */
export function dealWithRepeatedReq(config: CreateAxiosOptions) {
  if (config) {
    const controller = new AbortController();
    config.signal = controller.signal;
    requestStore.set(config, controller);
  }
  return config;
}

function generateReqKey(config: GenerateReqKeyData) {
  const { method, url, baseURL, params, data } = config;
  return [method, baseURL! + url, Qs.stringify(params), Qs.stringify(data)].join("&");
}

/**
 * ## 判断请求
 * @param config
 */
// function isRepeatedReq(config: CreateAxiosOptions) {
//   const data = {
//     method: config.method,
//     url: config.url,
//     baseURL: config.baseURL,
//   };
//   const key = generateReqKey(data);
//   if (whiteList.has(key)) {
//     const needCancel = whiteList.get(key);
//     // if()
//   }else{

//   }
// }

function removeFinishedReq() {}

// 白名单，有些请求可以重复请求
class WhiteList {
  private map: Map<string, boolean>;
  constructor() {
    this.map = new Map();
  }

  setupWhiteList(data: GenerateReqKeyData[]) {
    data.forEach(item => {
      if (typeof item.needCancel === "undefined") {
        item.needCancel = false;
      }
      const key = generateReqKey(item);
      this.map.set(key, item.needCancel);
    });
  }

  has(key: string) {
    return this.map.has(key);
  }

  get(key: string) {
    return this.map.get(key);
  }

  generateKey(config: GenerateReqKeyData) {
    const simpleConfig: GenerateReqKeyData = {
      baseURL: config.baseURL,
      url: config.url,
      method: config.method,
    };
    return generateReqKey(simpleConfig);
  }
}
// export const whiteList = new WhiteList();

// interface GenerateReqKeyData {
//   url: string;
//   baseURL?: string;
//   method: string;
//   needCancel?: boolean;
//   params?: any;
//   data?: any;
// }

type GenerateReqKeyData = Pick<CreateAxiosOptions, "baseURL" | "url" | "method" | "params" | "data"> & { needCancel?: boolean };

// TODO 增加重复请求的处理，取消重复请求
// 0. 阻止发送重复请求
// 1. 取消上一次请求，发送下一次请求
// 如果请求参数全部一致，取消之后的请求
// 如果类似与分页（有页码点击的那种），应取消之前的请求
// 处理数据竞态导致的问题

// 需要取消请求的情况
// 完全相同的需要取消：method,baseURL,url,param,data
// 部分相同的需要取消：method,baseURL,url
// 不需要取消
