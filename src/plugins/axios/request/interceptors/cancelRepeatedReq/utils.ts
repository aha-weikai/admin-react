import qs from "qs";
import { GenerateReqKeyData } from ".";

export function generateReqKey(config: GenerateReqKeyData) {
  const { method, url, baseURL, params, data } = config;
  return [method, baseURL! + url, qs.stringify(params), qs.stringify(data)].join("&");
}
