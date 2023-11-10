import { arrayIsNotHave, is2DArrays, isArray } from "@/utils";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { InterceptorManager } from "./interceptorManager";
import { SetupInterceptorArgs, Response, CreateAxiosOptions } from "./types";

type InterceptorType = "request" | "response";

export class Axios {
  private instance: AxiosInstance;
  requestInterceptorManager: InterceptorManager;
  responseInterceptorManager: InterceptorManager;
  constructor(defaultConfig: CreateAxiosOptions, interceptorOption?: SetupInterceptorArgs) {
    this.requestInterceptorManager = new InterceptorManager();
    this.responseInterceptorManager = new InterceptorManager();
    this.instance = axios.create(defaultConfig);
    if (interceptorOption) this.setupInterceptors(interceptorOption);
  }

  getInstance() {
    return this.instance;
  }

  setupInterceptors(interceptors: SetupInterceptorArgs): void {
    let key: keyof SetupInterceptorArgs;
    for (key in interceptors) {
      if (is2DArrays(interceptors[key])) {
        const interceptorArr = interceptors[key];
        for (const interceptor of interceptorArr) {
          const [resolve, reject, options] = interceptor;
          const interceptorNum = this.instance.interceptors[key].use(resolve as any, reject, options);
          this.saveInterceptor(key, interceptor, interceptorNum);
        }
      } else {
        throw Error("interceptors 的数据结构错误");
      }
    }
  }

  /**
   * ## 存储interceptor的返回值 key
   */
  saveInterceptor(type: InterceptorType, interceptor: any[], value: number) {
    if (type === "request") {
      this.requestInterceptorManager.set(interceptor, value);
    } else {
      this.responseInterceptorManager.set(interceptor, value);
    }
  }

  /**
   * ## 删除某个interceptor
   */
  deleteInterceptor(type: InterceptorType, interceptor: any[]) {
    if (type === "request") {
      this.requestInterceptorManager.delete(interceptor);
    } else {
      this.responseInterceptorManager.delete(interceptor);
    }
  }

  /**
   * ## 清空 interceptor
   */
  clearInterceptor(type?: InterceptorType) {
    if (type === "request") {
      this.instance.interceptors.request.clear();
      this.requestInterceptorManager.clear();
    } else if (type === "response") {
      this.instance.interceptors.response.clear();
      this.responseInterceptorManager.clear();
    } else {
      this.clearInterceptor("request");
      this.clearInterceptor("response");
    }
  }

  request<T, D = any>(config: CreateAxiosOptions): Response<T> {
    return this.instance(config);
  }

  get<T, D = any>(url: string, config?: CreateAxiosOptions): Response<T> {
    return this.instance.get(url, config);
  }

  post<T, D = any>(url: string, data?: D, config?: CreateAxiosOptions): Response<T> {
    return this.instance.post(url, data, config);
  }

  put<T, D = any>(url: string, data?: D, config?: CreateAxiosOptions): Response<T> {
    return this.instance.put(url, data, config);
  }

  delete<T, D = any>(url: string, config?: CreateAxiosOptions): Response<T> {
    return this.instance.delete(url, config);
  }
}

// 1. 可以创建多个实例
// 2. 方便use interceptors
// 3. 要有自定义配置，可以完成一些额外功能，比如
//  a. 自动携带token
//  b. 限制重复请求
//  c. 无感刷新token
/* 如果同时有很多接口401，那我们不能每个都调一下刷新token接口去刷新token，理论上只需要刷新一次就行了。
在刷新token没返回之前，又有新接口进来，如果正常请求的话，必然也会401，所以我们需要给拦截一下。
想解决上面问题，我们需要设置一个表示是否正在刷新token的变量和一个请求队列，如果正在刷新token，那我们把新的401接口都插入到一个队列中，然后等刷新接口拿到新接口了，把队列里的请求一起回放。解决第二个问题也很简单了，在请求拦截器中，判断是否正在刷新token，如果正在刷新token，也加入到队列中，等刷新token返回后，也一起回放。 */
//  d. 实现请求限流
//  e. 上传文件的封装
//  f. 请求取消
//  g. 竞态处理

// 大文件分片上传
// 断点上传

// axios.defaults 是axios配置，其defaults 与 axios.create(config)
// defaults 与 config 等效
// 但是当axios.create(config) 时，创建了一个新的axios，与导入的axios 无关
// axios的get，post，等方法被封装的很好，可以直接使用
// axios.get(url,newConfig) 会和 default 合并出一个新的 reqConfig，并不会修改config，不会影响到下次请求。
// AxiosInterceptorOptions 的runWhen 是通过处理config，返回boolean，决定是否放入interceptor
// AxiosInterceptorOptions 的synchronous(false) 是使axios.request 时，request中处理请求拦截器时候，处理为promise，promise队列为[请求拦截器promise1，请求拦截器promise2，请求，响应拦截器promise1，响应拦截器promise2]
// synchronous(default:true) 同步处理请求拦截器，返回的promise队列为[请求，响应拦截器promise1，响应拦截器promise2]

// 哪些网络请求情况存在着竞态的问题？
// tab页切换，且是同一个接口，使用同一个变量接收。
// 报表也存在类似问题
// 如何封装取消请求，通过将需要取消的请求塞入一个map中，在拦截器中进行处理。如果需要取消，通过封装抽象的取消功能，取消。

// 重复请求
// 只取第一次。
// 直接在请求拦截器中reject掉

// 大文件分片上传
// [请求拦截器promise1，请求拦截器promise2，请求，响应拦截器promise1，响应拦截器promise2]
/**
 * Dispatch a request
 *
 * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
 * @param {?Object} config
 *
 * @returns {Promise} The Promise to be fulfilled
 */
// request(configOrUrl, config) {
//   /*eslint no-param-reassign:0*/
//   // Allow for axios('example/url'[, config]) a la fetch API
//   if (typeof configOrUrl === "string") {
//     config = config || {};
//     config.url = configOrUrl;
//   } else {
//     config = configOrUrl || {};
//   }

//   config = mergeConfig(this.defaults, config);

//   const { transitional, paramsSerializer, headers } = config;

//   if (transitional !== undefined) {
//     validator.assertOptions(
//       transitional,
//       {
//         silentJSONParsing: validators.transitional(validators.boolean),
//         forcedJSONParsing: validators.transitional(validators.boolean),
//         clarifyTimeoutError: validators.transitional(validators.boolean),
//       },
//       false
//     );
//   }

//   if (paramsSerializer != null) {
//     if (utils.isFunction(paramsSerializer)) {
//       config.paramsSerializer = {
//         serialize: paramsSerializer,
//       };
//     } else {
//       validator.assertOptions(
//         paramsSerializer,
//         {
//           encode: validators.function,
//           serialize: validators.function,
//         },
//         true
//       );
//     }
//   }

//   // Set config.method
//   config.method = (config.method || this.defaults.method || "get").toLowerCase();

//   // Flatten headers
//   let contextHeaders = headers && utils.merge(headers.common, headers[config.method]);

//   headers &&
//     utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], method => {
//       delete headers[method];
//     });

//   config.headers = AxiosHeaders.concat(contextHeaders, headers);

//   // filter out skipped interceptors
//   // 筛选出需要跳过的拦截器
//   const requestInterceptorChain = [];
//   let synchronousRequestInterceptors = true;
//   // 遍历请求拦截器
//   // interceptors.request 数组 是 push requestInterceptor
//   // requestInterceptorChain ，请求拦截器后use的先放到requestInterceptorChain
//   // interceptors.request 先use的，后执行
//   this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
//     if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
//       return;
//     }

//     // interceptor.synchronous
//     // default false
//     // 只有当所有的 synchronous = true
//     // 请求拦截器才会同步执行
//     synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

//     // requestInterceptorChain 添加拦截器，先use的先unshift
//     requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
//   });

//   // 响应拦截器数组
//   const responseInterceptorChain = [];
//   // 顺序没有变化
//   this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
//     responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
//   });

//   let promise;
//   let i = 0;
//   let len;

//   // 如果是异步
//   if (!synchronousRequestInterceptors) {
//     // 处理成一个请求链
//     // [...请求拦截器,请求,undefined,...响应拦截器]
//     const chain = [dispatchRequest.bind(this), undefined];
//     chain.unshift.apply(chain, requestInterceptorChain);
//     // [...requestInterceptorChain,chain]
//     chain.push.apply(chain, responseInterceptorChain);
//     // [...requestInterceptorChain,chain,...responseInterceptorChain]
//     len = chain.length;

//     promise = Promise.resolve(config);

//     while (i < len) {
//       // interceptor的 resolve 和 reject按照顺序排
//       // 形成promise链
//       promise = promise.then(chain[i++], chain[i++]);
//     }

//     // 返回 异步的promise
//     return promise;
//   }

//   // 同步
//   len = requestInterceptorChain.length;

//   let newConfig = config;

//   i = 0;

//   while (i < len) {
//     const onFulfilled = requestInterceptorChain[i++];
//     const onRejected = requestInterceptorChain[i++];
//     try {
//       newConfig = onFulfilled(newConfig);
//     } catch (error) {
//       onRejected.call(this, error);
//       break;
//     }
//   }

//   try {
//     promise = dispatchRequest.call(this, newConfig);
//   } catch (error) {
//     return Promise.reject(error);
//   }

//   i = 0;
//   len = responseInterceptorChain.length;

//   while (i < len) {
//     // promise链
//     // 请求，响应拦截器
//     promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
//   }

//   // 返回promise
//   return promise;
// }
// axios

//     this.handlers.push({
//       fulfilled,
//       rejected,
//       synchronous: options ? options.synchronous : false,
//       runWhen: options ? options.runWhen : null
//     });

// synchronous: default-false ，，默认异步执行拦截器
// runWhen：defaut-null，，type: function
