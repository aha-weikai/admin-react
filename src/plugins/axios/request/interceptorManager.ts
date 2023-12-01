export type StoreKey = "request" | "response";
/**
 * ## 拦截器管理
 */
export class InterceptorManager {
  /** ## 拦截器仓库 */
  store: Map<StoreKey, Map<any[], number>>;
  constructor() {
    this.store = new Map();
    this.store.set("request", new Map());
    this.store.set("response", new Map());
  }

  set(type: StoreKey, key: any[], value: number) {
    return this.get(type)!.set(key, value);
  }

  delete(type: StoreKey, key: any[]) {
    if (this.get(type)?.has(key)) {
      const id = this.get(type)?.get(key);
      return this.get(type)?.delete(key) && id;
    }
  }

  clear(type?: StoreKey) {
    if (!type) {
      const arr: StoreKey[] = ["request", "response"];
      arr.forEach(item => {
        this.get(item)?.clear();
      });
    } else {
      this.get(type)?.clear();
    }
  }

  has(type: StoreKey, key: any[]) {
    return this.get(type)!.has(key);
  }

  get(type: StoreKey) {
    return this.store.get(type);
  }
}
