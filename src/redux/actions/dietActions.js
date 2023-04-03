const typeName = {
  setUserData: "diet/setUserData",
  clearUserData: "diet/clearUserData",
  setRecipe: "diet/setRecipe",
};

const setUserData = (payload) => {
  return {
    type: typeName.setUserData,
    payload,
  };
};

const clearUserData = () => {
  return {
    type: typeName.clearUserData,
  };
};

const setRecipe = (
  recipeId,
  editFormData,
  recipeCategory,
  ingredientsArray
) => {
  return {
    type: typeName.setRecipe,
    payload: { recipeId, ...editFormData, recipeCategory, ingredientsArray },
  };
};

export { typeName, setUserData, clearUserData, setRecipe };
