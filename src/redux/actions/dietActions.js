const typeName = {
  setUserData: "diet/setUserData",
  clearUserData: "diet/clearUserData",
  setRecipe: "diet/setRecipe",
  deleteRecipe: "diet/deleteRecipe",
  setWeek: "diet/setWeek",
  deleteWeek: "diet/deleteWeek",
  setActiveWeek: "diet/setActiveWeek",
  deleteActiveWeek: "diet/deleteActiveWeek",
  checkIngredient: "diet/checkIngredient",
};

const setUserData = (recipes, weeks, activeWeek) => {
  return {
    type: typeName.setUserData,
    payload: { recipes, weeks, activeWeek },
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

const setActiveWeek = (weekData, ingredientsData) => {
  return {
    type: typeName.setActiveWeek,
    payload: { ...weekData, ingredients: ingredientsData },
  };
};

const deleteActiveWeek = () => {
  return {
    type: typeName.deleteActiveWeek,
  };
};

const checkIngredient = (ingredientKey, isCheck) => {
  return {
    type: typeName.checkIngredient,
    payload: { key: ingredientKey, value: isCheck },
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
  setActiveWeek,
  deleteActiveWeek,
  checkIngredient,
};
