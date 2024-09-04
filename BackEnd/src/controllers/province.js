const provinceDao = require('../daos/province');

const getProvinces = async (req, res) => {
  const { search, searchFields, fields, offset, limit, sort } = req.query;
  const { userId } = req.user;
  const query = {};

  query.query = { userId };
  if (search) query.search = search;
  if (searchFields) query.searchFields = searchFields.split(',');
  if (fields) query.fields = fields.split(',');
  if (offset) query.offset = parseInt(offset, 10);
  if (limit) query.limit = parseInt(limit, 10);
  if (sort) query.sort = sort.split(',');

  Object.keys(req.query)
    .filter(
      (q) =>
        ['search', 'searchFields', 'fields', 'offset', 'limit', 'sort'].indexOf(
          q,
        ) === -1,
    )
    .forEach((q) => {
      query.query[q] = ['true', 'false'].includes(req.query[q])
        ? JSON.parse(req.query[q])
        : req.query[q];
    });
  const { provinces, total } = await provinceDao.findProvinces(query);

  return res.send({ provinces, total });
};

module.exports = { getProvinces };
