import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsTerminalNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isTerminalNumber",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const result = new RegExp(/^([A-Z])\d{1,2}/).test(value);
          return result;
        },
        defaultMessage(args: ValidationArguments) {
          return `$property must be a terminal number conforming to the specified constraints`;
        }
      }
    });
  };
}