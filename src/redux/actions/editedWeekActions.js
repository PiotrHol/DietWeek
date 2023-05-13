const typeName = {
  setAllDays: "editedWeek/setAllDays",
  setSingleRecipe: "editedWeek/setSingleRecipe",
  clearWeek: "editedWeek/clearWeek",
  recalculateCalories: "editedWeek/recalculateCalories",
  recalculateDayCalories: "editedWeek/recalculateDayCalories",
};

const setAllDays = (allWeek) => {
  return {
    type: typeName.setAllDays,
    payload: allWeek,
  };
};

const clearWeek = () => {
  return {
    type: typeName.clearWeek,
  };
};

const recalculateCalories = (recipesObj) => {
  return {
    type: typeName.recalculateCalories,
    payload: recipesObj,
  };
};

const recalculateDayCalories = (day, recipesObj) => {
  return {
    type: typeName.recalculateDayCalories,
    payload: { day, recipesObj },
  };
};

const setSingleRecipe = (dayAndDish, recipeId) => {
  return {
    type: typeName.setSingleRecipe,
    payload: {
      day: dayAndDish[0],
      dish: dayAndDish[1],
      recipeId,
    },
  };
};

export {
  typeName,
  setAllDays,
  clearWeek,
  recalculateCalories,
  recalculateDayCalories,
  setSingleRecipe,
};
