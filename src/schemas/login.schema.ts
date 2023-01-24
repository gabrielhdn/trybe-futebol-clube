import * as Joi from 'joi';

const message = {
  'string.empty': 'All fields must be filled',
  'any.required': 'All fields must be filled',
};

export default Joi.object({
  email: Joi.string().required().messages(message),
  password: Joi.string().required().messages(message),
});
