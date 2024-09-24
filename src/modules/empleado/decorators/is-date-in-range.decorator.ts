import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

interface DateRangeOptions {
  min?: Date;
  max?: Date;
}

export function IsDateInRange(
  options: DateRangeOptions,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isDateInRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: {
        validate(value: Date, args: ValidationArguments) {
          if (value === null || value === undefined) return true;

          if (!(value instanceof Date)) return false;

          const [{ min, max }] = args.constraints;

          if (min && value < min) return false;

          if (max && value > max) return false;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [{ min, max }] = args.constraints;

          if (min && max) {
            return `${args.property} must be between ${min.toISOString()} and ${max.toISOString()}`;
          } else if (min) {
            return `${args.property} must not be before ${min.toISOString()}`;
          } else if (max) {
            return `${args.property} must not be after ${max.toISOString()}`;
          } else {
            return `${args.property} has an invalid date range`;
          }
        },
      },
    });
  };
}
