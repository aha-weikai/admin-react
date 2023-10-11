import { ClassConstructor, ClassTransformOptions, plainToInstance as _plainToInstance } from "class-transformer";

export type { ClassConstructor } from "class-transformer";

/**
 * # 通过类，去除对象中多余的属性
 * Converts plain (literal) object to class (constructor) object. Also works with arrays.
 * @param cls
 * @param plain
 * @param options
 */
export function plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V, options?: ClassTransformOptions | undefined): T;
export function plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V[], options?: ClassTransformOptions | undefined): T[] {
  return _plainToInstance(cls, plain, { excludeExtraneousValues: true, ...options });
}
