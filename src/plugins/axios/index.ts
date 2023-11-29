import { HTTP_BASE_URL } from "@/config";
import { Axios } from "./request";
import {
  dealWithExpiredToken,
  dealWithRepeatedReq,
  dealWithReqWhenTokenExpired,
  dealWithResponseErr,
  dealWithResponseSuccess,
  dealWithToken,
} from "./request/interceptors";

export const http = new Axios(
  {
    baseURL: HTTP_BASE_URL,
    timeout: 10 * 1000,
    _customOptions: {
      withToken: true,
    },
  },
  {
    request: [
      [dealWithToken, null],
      [dealWithReqWhenTokenExpired, null],
      [dealWithRepeatedReq, null],
    ],
    response: [
      [null, dealWithExpiredToken],
      [dealWithResponseSuccess, dealWithResponseErr],
    ],
  }
);

// TODO 增加重复请求的处理，取消重复请求
// 1. 阻止发送重复请求
// 2. 取消上一次请求，发送下一次请求
// 如果请求参数全部一致，取消之后的请求
// 如果类似与分页（有页码点击的那种），应取消之前的请求
