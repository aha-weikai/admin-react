import { HTTP_BASE_URL } from "@/config";
import { Axios } from "./request";
import {
  dealWithExpiredToken,
  dealWithRepeatedReq,
  dealWithReqWhenTokenExpired,
  dealWithResponseErr,
  dealWithResponseSuccess,
  dealWithToken,
  removeRepeatedReqErr,
  removeRepeatedReq,
  cancelReqManual as cancelReqManualFn,
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
      [removeRepeatedReq, removeRepeatedReqErr],
      [null, dealWithExpiredToken],
      [dealWithResponseSuccess, dealWithResponseErr],
    ],
  }
);

export const cancelReqManual = cancelReqManualFn;
