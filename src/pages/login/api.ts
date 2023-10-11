import { http } from "@/plugins/axios";
import { LoginParams, LoginRes } from "./model";
import { userStore } from "@/stores";
import { formatParam } from "@/utils";

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
    sessionStorage.setItem("token", JSON.stringify(data));
    userStore.setState({ token: data });
  }
  return [err, { data }];
}
