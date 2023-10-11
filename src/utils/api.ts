import { ClassConstructor, plainToInstance } from "@/plugins";

/**
 * # 格式化请求参数
 * @description 为了网络请求只发送需要的参数，便于排查问题
 * @param cls
 * @param plain
 */
export function formatParam<T, V>(cls: ClassConstructor<T>, plain: V): T;
export function formatParam<T, V>(cls: ClassConstructor<T>, plain: V[]): T[];
export function formatParam<T, V>(cls: any, plain: any) {
  return plainToInstance(cls, plain);
}
