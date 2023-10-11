import { ClassConstructor, plainToInstance } from "@/plugins";

export function formatParam<T, V>(cls: ClassConstructor<T>, plain: V[]) {
  return plainToInstance(cls, plain);
}
