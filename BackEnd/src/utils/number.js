const formatNumber = (value, defaultValue) =>
  // eslint-disable-next-line no-restricted-globals
  value && !isNaN(value) ? parseInt(value, 10) : defaultValue;

const delimitNumber = (number) => {
  const delimiter = '.';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
};

module.exports = { formatNumber, delimitNumber };
