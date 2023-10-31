import { getToken } from "@/utils";
import { http } from "../..";
import { STORAGE } from "@/constants";
import * as api from "@/api";
import { CreateAxiosOptions } from "../types";

/**
 * # 无感刷新token
 * 1. 首先，需要刷新token 的时机，在accessToken 过期的时候
 * 2. 需要存储当前请求
 * 3. 调用刷新token 的接口
 * 4. 如果接口返回新的token，则执行之前的保存的请求
 * 5. 如果失败，则跳转登录页
 *
 *
 * a. 不知道token过期，当出现多个请求返回token过期，仍只需要执行一次刷新token的操作
 * b. 知道token过期，应该拦截请求，等刷新token后执行请求
 */

/**
 * # 请求的队列，
 * @description 用来保存返回token过期的接口，和token过期时执行的请求接口
 * @param resolve Promise 的 resolve函数
 */
const requestQueue: { resolve: any; config: any; type: "request" | "response" }[] = [];

/**
 * # 当前刷新token的标识
 * @description 表示，当前是否刷新token
 * @default false
 */
let refreshTokenFlag = false;

/**
 * # 处理过期token
 * @param err
 */
export function dealWithExpiredToken(err: any) {
  console.log("处理过期token");
  const { status, config } = err?.response || {};
  console.log(status);
  if (status === 401) {
    // promise的使用
    // return Promise
    // 然后，resolve值，才是真正的返回值
    return new Promise(resolve => {
      requestQueue.push({
        resolve,
        config,
        type: "response",
      });

      // 如果当前没在刷新中，则执行刷新
      if (!refreshTokenFlag) {
        refreshToken();
      }
    });
  } else {
    // 其他错误处理
    return err;
  }
}

async function refreshToken() {
  console.log("---");
  // 执行刷新，设置刷新状态 true
  refreshTokenFlag = true;
  const tokenStr = localStorage.getItem(STORAGE.LOCAL.TOKEN);
  const token = JSON.parse(tokenStr || "{}");
  console.log(token);
  if (!token.refreshToken) {
    // 跳转到登录页
  }

  // 调用 refreshToken 接口
  const [err, { data }] = await api.user.refreshToken();
  console.log(data);
  if (err) {
    // 如果接口报错，就跳转登录页
    return;
  }

  // 接口没报错，设置新的token
  token.accessToken = data.accessToken;
  localStorage.setItem(STORAGE.LOCAL.TOKEN, JSON.stringify(token));

  // 刷新结束，设置刷新状态 false
  refreshTokenFlag = false;

  //开始执行之前保存的请求
  Array.from({ length: requestQueue.length }).forEach(async () => {
    const request = requestQueue.shift();

    if (request) {
      const { config, resolve, type } = request;
      if (type === "response") {
        resolve(await http.request(config));
      } else {
        config.headers.Authorization = getToken(token.accessToken);
        resolve(config);
      }
    }
  });
}

/**
 * # 当刷新token时，收集将要执行的请求
 * @param config
 * @returns axiosConfig
 */
export function dealWithReqWhenTokenExpired(config: CreateAxiosOptions): Promise<any> {
  if (refreshTokenFlag && config._customOptions?.withToken) {
    return new Promise(resolve => {
      requestQueue.push({
        resolve,
        config,
        type: "request",
      });
    });
  }

  return Promise.resolve(config);
}
