const mung = require('express-mung');

const successReq = () =>
  mung.json((body) => {
    const isErrorResponse = body.code || body.error_message;

    if (isErrorResponse) return body;
    return { status: 1, result: { ...body } };
  });

module.exports = successReq;
