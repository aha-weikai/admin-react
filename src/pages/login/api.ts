import { http } from "@/plugins/axios";
import { LoginParams, LoginRes } from "./model";
import { userStore } from "@/stores";
import { formatParam } from "@/utils";
import { STORAGE } from "@/constants";

export function getCaptcha() {
  return http.get<{ captchaKey: string; data: string }>("/captcha");
}

export function getPublicKey() {
  return http.get<string>("/auth/public_key");
}

export async function login(param: LoginParams) {
  param = formatParam(LoginParams, param);
  const [err, { data }] = await http.post<LoginRes>("/auth/login", param);
  if (!err) {
    localStorage.setItem(STORAGE.LOCAL.TOKEN, JSON.stringify(data));
    userStore.setState({ token: data });
  }
  return [err, { data }];
}

export function getUserInfo() {
  return http.get("/user_info");
}
