import { http } from "@/plugins/axios";

export function getCaptcha() {
  return http.get<{ captchaKey: string; data: string }>("/captcha");
}

export function getPublicKey() {
  return http.get<string>("/auth/public_key");
}

export function login() {
  return http.post("/auth/login");
}
