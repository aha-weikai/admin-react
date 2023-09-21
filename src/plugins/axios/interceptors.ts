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
