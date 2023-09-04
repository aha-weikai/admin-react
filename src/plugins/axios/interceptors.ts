import { CreateAxiosOptions } from "./request/types";

export function dealWithToken(config: CreateAxiosOptions) {
  if (config?._customOptions && config._customOptions.withToken) {
    config.headers!.Authorization = "Bear " + "";
  }
  return config;
}

export function dealWithRepeatableReq(config: CreateAxiosOptions) {
  console.log(config);

  return config;
}

export function dealWithResponseErr(err: any) {
  console.log(err);
}
