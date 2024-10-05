import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidDni(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'IsValidDni',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return (
            value.toString().length === 8 &&
            !isNaN(Number(value)) &&
            Number(value) > 0
          );
        },
        defaultMessage(args: ValidationArguments): string {
          return `El dni debe tener un formato válido`;
        },
      },
    });
  };
}
