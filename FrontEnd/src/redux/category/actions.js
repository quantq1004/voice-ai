export const actionTypes = {
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
};

export const setSelectedCategory = (category) => ({
  type: actionTypes.SET_SELECTED_CATEGORY,
  category,
});
