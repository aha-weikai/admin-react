import { http } from "@/plugins/axios";

export const login = {
  getCaptcha() {
    return http.get<{ captchaKey: string; data: string }>("/captcha");
  },

  getPublicKey() {
    return http.get<string>("/auth/public_key");
  },
};
