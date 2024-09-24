import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3000),
  MONGODB_URI: Joi.string().required(),
});
