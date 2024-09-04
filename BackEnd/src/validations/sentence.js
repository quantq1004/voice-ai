const { Joi, validate } = require('express-validation');

const elemNsw = Joi.object().keys({
  originalText: Joi.string().trim().required(),
  normalizedText: Joi.string().trim().required(),
});

const createSentence = {
  body: Joi.object({
    code: Joi.string().trim().required(),
    originalText: Joi.string().trim().required(),
    normalizedText: Joi.string().trim().required(),
    nsws: Joi.array().items(elemNsw).required(),
    datasetId: Joi.string().trim().required(),
  }),
};

module.exports = {
  createSentenceValidate: validate(createSentence, { keyByField: true }),
};
