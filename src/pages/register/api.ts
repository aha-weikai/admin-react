import { http } from "@/plugins/axios";
import { Exclude, Expose } from "class-transformer";

export function register(data: RegisterParams) {
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
