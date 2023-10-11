import { http } from "@/plugins/axios";
import { formatParam } from "@/utils";
import { Exclude, Expose } from "class-transformer";

export function register(data: RegisterParams) {
  data = formatParam(RegisterParams, data);
  return http.post("/auth/register", data);
}

export class RegisterParams {
  @Expose()
  public account!: string;

  @Expose()
  password!: string;

  @Expose()
  confirmedPassword!: string;

  @Expose()
  publicKey!: string;
}
