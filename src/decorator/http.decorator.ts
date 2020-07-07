import { HttpService } from "@nestjs/common";
import { map } from 'rxjs/operators';

export const GetHttp = (url: string = ""): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {

    descriptor.value = function (...args: any[]) {
      let instance: HttpService = null;
      for (const property in this) {
        if (this[property] instanceof HttpService) {
          instance = this[property];
          break;
        }
      }

      var returnType = Reflect.getMetadata("design:returntype", target, propertyKey);

      if (!instance) return;

      return instance.get(url, { responseType: 'json' }).pipe(map(response => {
        if (Array.isArray(response.data)) {
          return new returnType(...response.data)
        }

        return new returnType(response.data)
      }));
    }

    return descriptor;
  }
};