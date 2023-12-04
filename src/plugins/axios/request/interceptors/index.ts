export { dealWithRepeatedReq, removeRepeatedReqErr, removeRepeatedReq } from "./cancelRepeatedReq";
export * from "./refreshToken";
export * from "./formatData";

import { STORAGE } from "@/constants";
import { getToken } from "@/utils";
import { CreateAxiosOptions } from "../types";

/**
 * # 添加token
 * @param config 请求配置
 * @returns config
 */
export function dealWithToken(config: CreateAxiosOptions) {
  const rawToken = localStorage.getItem(STORAGE.LOCAL.TOKEN);
  if (!rawToken) return config;

  const token = JSON.parse(rawToken).accessToken;
  if (config?._customOptions && config._customOptions.withToken) {
    config.headers!.Authorization = getToken(token);
  }
  return config;
}
