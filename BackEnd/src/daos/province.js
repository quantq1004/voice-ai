const Province = require('../models/province');
const daoUtils = require('./utils');

const getProvinceById = async (id) => {
  const province = await Province.findById(id);
  return province;
};

const findProvinces = async (queryFields) => {
  const { documents: provinces, total } = await daoUtils.findAll(
    Province,
    queryFields,
  );
  return { provinces, total };
};

module.exports = { getProvinceById, findProvinces };
