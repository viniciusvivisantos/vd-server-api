import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const ResponseMapper = (TReturn): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const returnType = Reflect.getMetadata("design:returntype", target, propertyKey);
      if (returnType === Promise)
        return (method.apply(this, args) as Promise<any>).then(data => plainToClass(TReturn, data, { excludeExtraneousValues: true }));

      if (returnType === Observable)
        return (method.apply(this, args) as Observable<any>).pipe(map(data => plainToClass(TReturn, data, { excludeExtraneousValues: true })));

      return plainToClass(TReturn, method.apply(this, args), { excludeExtraneousValues: true });
    }

    return descriptor;
  }
};