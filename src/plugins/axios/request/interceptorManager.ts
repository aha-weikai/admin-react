export class InterceptorManager {
  store: Map<any[], number>;
  constructor() {
    this.store = new Map();
  }

  set(key: any[], value: number) {
    return this.store.set(key, value);
  }

  delete(key: any[]) {
    return this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }

  has(key: any[]) {
    return this.store.has(key);
  }
}
