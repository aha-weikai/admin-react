/**
 * ## 拦截器管理
 */
export class InterceptorManager {
  /** ## 拦截器仓库 */
  store: Map<any[], number>;
  constructor() {
    this.store = new Map();
  }

  set(key: any[], value: number) {
    return this.store.set(key, value);
  }

  delete(key: any[]) {
    if (this.has(key)) {
      return this.store.get(key);
    }
  }

  clear() {
    this.store.clear();
  }

  has(key: any[]) {
    return this.store.has(key);
  }
}
