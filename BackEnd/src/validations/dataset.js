const { Joi, validate } = require('express-validation');
const { DATASET_STATUS } = require('../constants');

const createDataset = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    categoryId: Joi.string().trim().required(),
  }),
};

const updateDataset = {
  body: Joi.object({
    name: Joi.string().trim().optional(),
    categoryId: Joi.string().trim().optional(),
    status: Joi.string()
      .valid(...Object.values(DATASET_STATUS))
      .optional(),
  }),
};

module.exports = {
  createDatasetValidate: validate(createDataset, { keyByField: true }),
  updateDatasetValidate: validate(updateDataset, { keyByField: true }),
};
