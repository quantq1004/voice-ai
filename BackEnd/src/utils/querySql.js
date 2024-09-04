const getDataQuerySQL = async (connection, sql) =>
  new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      resolve(results || {});
      return null;
    });
  });

module.exports = { getDataQuerySQL };
