import { GenerateReqKeyData, WhiteList, generateReqKey } from ".";

export class RequestStore {
  private store: Map<string, AbortController>;
  private whiteList: WhiteList;
  constructor() {
    this.store = new Map();
    this.whiteList = new WhiteList();
  }

  /**
   * ## 判断并添加请求
   * 1. 不在白名单中，直接添加
   * 2. 在白名单中，需要分情况，有些接口不需要，但是部分接口需要(分页，查询)
   * 3. 在白名单中的比较特殊，所以，之前取消已经有的，重新记录
   * 4. 不在白名单中，则取消现在的请求，不记录
   * @param config
   * @param controller
   */
  set(config: GenerateReqKeyData, controller: AbortController, cancelFn: (data: any) => void) {
    const isInWhiteList = this.getIsInWhiteList(config);
    if (isInWhiteList) {
      const isNeed = this.getIsNeedDealInWL(config);
      if (isNeed) {
        const key = this.whiteList.generateKey(config);
        if (this.store.has(key)) {
          cancelFn(this.store.get(key)!);
        }
        this.store.set(key, controller);
      }
    } else {
      const key = generateReqKey(config);
      if (this.store.has(key)) {
        cancelFn(controller);
      } else {
        this.store.set(key, controller);
      }
    }
  }

  get(config: GenerateReqKeyData) {
    const isInWhiteList = this.getIsInWhiteList(config);
    if (isInWhiteList) {
      const key = this.whiteList.generateKey(config);
      return this.store.get(key);
    } else {
      const key = generateReqKey(config);
      return this.store.get(key);
    }
  }

  delete(config: GenerateReqKeyData) {
    const isInWhiteList = this.getIsInWhiteList(config);
    let key;
    if (isInWhiteList) {
      const isNeed = this.getIsNeedDealInWL(config);
      if (isNeed) key = this.whiteList.generateKey(config);
    } else {
      key = generateReqKey(config);
    }
    if (key && this.store.has(key)) {
      this.store.delete(key);
    }
  }

  getIsInWhiteList(config: GenerateReqKeyData) {
    const key = this.whiteList.generateKey(config);
    return this.whiteList.has(key);
  }

  /**
   * ## 判断请求在白名单中是否需要进行重复处理
   */
  private getIsNeedDealInWL(config: GenerateReqKeyData) {
    const key = this.whiteList.generateKey(config);
    return this.whiteList.get(key);
  }

  setupWhiteList(data: GenerateReqKeyData[]) {
    this.whiteList.setupWhiteList(data);
  }
}
