import { AxiosResponse } from "axios";
import { CreateAxiosOptions } from "./request/types";
import * as api from "@/api";
import { STORAGE } from "@/constants";
import { getToken } from "@/utils";

export function dealWithToken(config: CreateAxiosOptions) {
  const rawToken = localStorage.getItem(STORAGE.LOCAL.TOKEN);
  if (!rawToken) return config;

  const token = JSON.parse(rawToken).accessToken;
  if (config?._customOptions && config._customOptions.withToken) {
    config.headers!.Authorization = getToken(token);
  }
  console.log(config, "----");
  return config;
}

export function dealWithRepeatableReq(config: CreateAxiosOptions) {
  return config;
}

export function dealWithResponseErr(err: any) {
  const response = err?.response || {};
  const { data } = response;
  console.log([true, data, response]);
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
  console.log(err);
  console.log("处理过期token");
  const { status, config } = err?.response || {};
  if (status === 401) {
    console.log(err.response);
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

async function refreshToken() {
  refreshTokenFlag = true;
  const tokenStr = localStorage.getItem(STORAGE.LOCAL.TOKEN);
  const token = JSON.parse(tokenStr || "{}");
  if (!token.refreshToken) {
    // 跳转到登录页
  }

  // 调用 refreshToken 接口
  const [err, { data }] = await api.user.refreshToken();
  if (err) {
    // 如果接口报错，就跳转登录页
    return;
  }

  token.accessToken = data.accessToken;
  localStorage.setItem(STORAGE.LOCAL.TOKEN, JSON.stringify(token));

  // 接口没报错，设置新的token

  refreshTokenFlag = false;

  //
}

/**
 * # 无感刷新token
 * 1. 首先，需要刷新token 的时机，在accessToken 过期的时候
 * 2. 需要存储当前请求
 * 3. 调用刷新token 的接口
 * 4. 如果接口返回新的token，则执行之前的保存的请求
 * 5.
 *
 */
