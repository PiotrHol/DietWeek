const typeName = {
  setUserData: "diet/setUserData",
  clearUserData: "diet/clearUserData",
  setRecipe: "diet/setRecipe",
  deleteRecipe: "diet/deleteRecipe",
  setWeek: "diet/setWeek",
  deleteWeek: "diet/deleteWeek",
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

const deleteRecipe = (recipeId) => {
  return {
    type: typeName.deleteRecipe,
    payload: recipeId,
  };
};

const setWeek = (weekId, weekName, weekCalories, weekData) => {
  return {
    type: typeName.setWeek,
    payload: {
      id: weekId,
      name: weekName,
      calories: weekCalories,
      week: weekData,
    },
  };
};

const deleteWeek = (weekId) => {
  return {
    type: typeName.deleteWeek,
    payload: weekId,
  };
};

export {
  typeName,
  setUserData,
  clearUserData,
  setRecipe,
  deleteRecipe,
  setWeek,
  deleteWeek,
};
