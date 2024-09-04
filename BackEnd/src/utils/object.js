const convertObjectIdToString = (obj) => {
  if (typeof obj !== 'object') {
    return obj;
  }

  // typeof null = object
  if (obj === null) {
    return null;
  }

  // Check if obj is Mongoose Object
  if (obj._doc) {
    return convertObjectIdToString(obj.toJSON());
  }

  // Check if obj is ObjectId
  if (obj._bsontype === 'ObjectID') {
    return obj.toString();
  }

  Object.keys(obj).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    obj[key] = convertObjectIdToString(obj[key]);
  });

  if (Array.isArray(obj)) return obj;
  if (Object.prototype.toString.call(obj) === '[object Date]') return obj;

  return obj;
};

const normalizeObject = (obj) => convertObjectIdToString(obj);

module.exports = { normalizeObject };
