import { STORAGE } from "@/constants";
import { http } from "@/plugins";
import { getToken } from "@/utils";

export function refreshToken() {
  const rawToken = localStorage.getItem(STORAGE.LOCAL.TOKEN);

  const token = JSON.parse(rawToken!).refreshToken;
  return http.get<{ accessToken: string }>("/auth/refresh_token", {
    _customOptions: { withToken: false },
    headers: {
      Authorization: getToken(token),
    },
  });
}
