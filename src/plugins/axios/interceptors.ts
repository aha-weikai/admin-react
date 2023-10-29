import { AxiosResponse } from "axios";
import { CreateAxiosOptions } from "./request/types";

export function dealWithToken(config: CreateAxiosOptions) {
  if (config?._customOptions && config._customOptions.withToken) {
    config.headers!.Authorization = "Bear " + "";
  }
  return config;
}

export function dealWithRepeatableReq(config: CreateAxiosOptions) {
  return config;
}

export function dealWithResponseErr(err: any) {
  const response = err?.response || {};
  const { data } = response;
  return [true, data, response];
}

export function dealWithResponseSuccess(res: AxiosResponse): [boolean, any, AxiosResponse] {
  return [false, res.data, res];
}

const requestQueue: { resolve: any; config: any; type: "request" | "response" }[] = [];
let refreshTokenFlag = false;
/**
 * # 处理过期token
 * @param err
 */
export function dealWithExpiredToken(err: any) {
  console.log("处理过期token");
  const { status, config } = err?.response || {};
  if (status === 401) {
    return new Promise(resolve => {
      requestQueue.push({
        resolve,
        config,
        type: "response",
      });

      console.log(err);
      if (!refreshTokenFlag) {
        refreshToken();
      }
    });
  }
}

function refreshToken() {
  refreshTokenFlag = true;
  // const {} =
  let refreshToken = "";
  if (!refreshToken) {
    // 跳转到登录页
  }

  // 调用 refreshToken 接口

  // 如果接口报错，就跳转登录页

  // 接口没报错，设置新的token

  refreshTokenFlag = false;

  //
}
