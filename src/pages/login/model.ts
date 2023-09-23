export class LoginParams {
  password: number;

  constructor(partial: Partial<LoginParams>) {
    Object.assign(this, partial);
  }
}
