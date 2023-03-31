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

const setRecipe = (recipeId, editFormData, ingredientsArray) => {
  return {
    type: typeName.setRecipe,
    payload: { recipeId, ...editFormData, ingredientsArray },
  };
};

export { typeName, setUserData, clearUserData, setRecipe };
