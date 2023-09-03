export class InterceptorManager {
  store: Map<any[], number>;
  constructor() {
    this.store = new Map();
  }

  set(key: any[], value: number) {
    this.store.set(key, value);
  }

  delete(key: any[]) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }

  has(key: any[]) {
    this.store.forEach;
    return this.store.has(key);
  }
}
