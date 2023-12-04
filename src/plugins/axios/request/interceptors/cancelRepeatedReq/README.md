/\*\*

- ## 判断请求
- @param config
  \*/
  // function isRepeatedReq(config: CreateAxiosOptions) {
  // const data = {
  // method: config.method,
  // url: config.url,
  // baseURL: config.baseURL,
  // };
  // const key = generateReqKey(data);
  // if (whiteList.has(key)) {
  // const needCancel = whiteList.get(key);
  // // if()
  // }else{

// }
// }

function removeFinishedReq() {}

// 白名单，有些请求可以重复请求

// export const whiteList = new WhiteList();

// interface GenerateReqKeyData {
// url: string;
// baseURL?: string;
// method: string;
// needCancel?: boolean;
// params?: any;
// data?: any;
// }

// TODO 增加重复请求的处理，取消重复请求
// 0. 阻止发送重复请求
// 1. 取消上一次请求，发送下一次请求
// 如果请求参数全部一致，取消之后的请求
// 如果类似与分页（有页码点击的那种），应取消之前的请求
// 处理数据竞态导致的问题

// 需要取消请求的情况
// 完全相同的需要取消：method,baseURL,url,param,data
// 部分相同的需要取消：method,baseURL,url
// 不需要取消
