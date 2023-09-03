import { HTTP_BASE_URL } from "@/config";
import { Axios } from "./request";



export const http = new Axios(
  {
    baseURL: HTTP_BASE_URL,
    timeout: 10 * 1000,
  },
  {
    request: [
      [
        function dealWithToken(config) {
          console.log(config);
          return config;
        },
        function dealWithTokenErr(err) {
          console.log(err);
        },
      ],
    ],
    response: [],
  }
).getInstance();
