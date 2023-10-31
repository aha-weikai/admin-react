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
      [dealWithReqWhenTokenExpired, null],
      [dealWithToken, null],
      [dealWithRepeatedReq, null],
    ],
    response: [
      [null, dealWithExpiredToken],
      [dealWithResponseSuccess, dealWithResponseErr],
    ],
  }
);
