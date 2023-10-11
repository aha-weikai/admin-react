import { Expose } from "class-transformer";

export class LoginParams {
  @Expose()
  account!: string;

  @Expose()
  password!: string;

  @Expose()
  publicKey!: string;

  @Expose()
  captchaKey!: string;

  @Expose()
  captchaData!: string;
}

export class LoginRes {
  @Expose()
  refreshToken!: string;

  @Expose()
  accessToken!: string;
}
