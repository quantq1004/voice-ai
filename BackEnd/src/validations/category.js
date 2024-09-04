const { Joi, validate } = require('express-validation');

const createCategory = {
  body: Joi.object({
    icon: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
  }),
};

const updateCategory = {
  body: Joi.object({
    icon: Joi.string().trim().optional(),
    name: Joi.string().trim().optional(),
  }),
};

const elemNsw = Joi.object().keys({
  originalText: Joi.string().trim().required(),
  normalizedText: Joi.string().trim().required(),
});

const createDataset = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    sentencesArray: Joi.array()
      .items(
        Joi.object({
          originalText: Joi.string().trim().required(),
          normalizedText: Joi.string().trim().required(),
          nsws: Joi.array().items(elemNsw).optional(),
        }),
      )
      .required(),
  }),
};

module.exports = {
  createCategoryValidate: validate(createCategory, { keyByField: true }),
  updateCategoryValidate: validate(updateCategory, { keyByField: true }),
  createDatasetValidate: validate(createDataset, { keyByField: true }),
};
