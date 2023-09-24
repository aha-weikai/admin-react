import { http } from "@/plugins/axios";
import { Exclude, Expose } from "class-transformer";

export const register = {
  register(data: RegisterParams) {
    return http.post("/auth/register", data);
  },
};

export class RegisterParams {
  @Expose()
  public account!: string;
  password!: string;
  confirmedPassword!: string;
  publicKey!: string;
}
