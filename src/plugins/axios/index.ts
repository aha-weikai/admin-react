import { HTTP_BASE_URL } from "@/config";
import { Axios } from "./request";
import { dealWithRepeatableReq, dealWithResponseErr, dealWithResponseSuccess, dealWithToken } from "./interceptors";

export const http = new Axios(
  {
    baseURL: HTTP_BASE_URL,
    timeout: 10 * 1000,
  },
  {
    request: [
      [dealWithToken, null],
      [dealWithRepeatableReq, null],
    ],
    response: [[dealWithResponseSuccess, dealWithResponseErr]],
  }
);
