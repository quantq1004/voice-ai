const { Joi, validate } = require('express-validation');

const login = {
  body: Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  }),
};

const register = {
  body: Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    name: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    phone: Joi.string().trim().optional(),
    avatar: Joi.string().trim().optional(),
  }),
};

module.exports = {
  loginValidate: validate(login, { keyByField: true }),
  registerValidate: validate(register, { keyByField: true }),
};
