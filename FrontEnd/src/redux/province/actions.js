export const actionTypes = {
  ADD_PROVINCES: 'ADD_PROVINCES',
};

const addProvinces = (provinces) => ({
  type: actionTypes.ADD_PROVINCES,
  provinces,
});

export { addProvinces };
