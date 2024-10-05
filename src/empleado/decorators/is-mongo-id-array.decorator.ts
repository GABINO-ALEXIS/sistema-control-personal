import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { isValidObjectId } from 'mongoose';

export function IsMongoIdArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'IsMongoIdArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value === null || value === undefined) return false;
          return value.every(
            (v) => isValidObjectId(v) && typeof v === 'string',
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} debe ser un ID válido de MongoDB o un array de IDs válidos.`;
        },
      },
    });
  };
}
