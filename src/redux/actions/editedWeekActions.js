const typeName = {
  setAllDays: "editedWeek/setAllDays",
  setSingleRecipe: "editedWeek/setSingleRecipe",
  clearWeek: "editedWeek/clearWeek",
  recalculateCalories: "editedWeek/recalculateCalories",
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

const recalculateCalories = () => {
  return {
    type: typeName.recalculateCalories,
  };
};

const setSingleRecipe = (dayAndDish, recipeId, recipeName, recipeCalories) => {
  return {
    type: typeName.setSingleRecipe,
    payload: {
      day: dayAndDish[0],
      dish: dayAndDish[1],
      recipeId,
      recipeName,
      recipeCalories,
    },
  };
};

export {
  typeName,
  setAllDays,
  clearWeek,
  recalculateCalories,
  setSingleRecipe,
};
