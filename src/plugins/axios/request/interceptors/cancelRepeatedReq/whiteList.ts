import qs from "qs";
import { GenerateReqKeyData, generateReqKey } from ".";

export class WhiteList {
  private map: Map<string, boolean>;
  constructor() {
    this.map = new Map();
  }

  setupWhiteList(data: GenerateReqKeyData[]) {
    data.forEach(item => {
      if (typeof item.needCancel === "undefined") {
        item.needCancel = false;
      }
      const key = generateReqKey(item);
      this.map.set(key, item.needCancel);
    });
  }

  has(key: string) {
    return this.map.has(key);
  }

  get(key: string) {
    return this.map.get(key);
  }

  generateKey(config: GenerateReqKeyData) {
    const simpleConfig: GenerateReqKeyData = {
      baseURL: config.baseURL,
      url: config.url,
      method: config.method,
    };
    return generateReqKey(simpleConfig);
  }
}
