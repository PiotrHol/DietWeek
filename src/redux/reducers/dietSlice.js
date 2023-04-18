import { typeName, setUserData } from "../actions/dietActions";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { app } from "../../firebase";

const initialState = {
  recipes: [],
  weeks: [],
  activeWeek: null,
};

const fetchUserData = async (dispatch, getState) => {
  const recipes = await getDocs(
    collection(getFirestore(app), "users", getState().auth.userId, "recipes")
  );
  const recipesArray = [];
  recipes.forEach((recipe) => {
    recipesArray.push({
      ...recipe.data(),
      id: recipe.id,
    });
  });
  dispatch(setUserData(recipesArray));
};

const dietReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.setUserData:
      return {
        ...state,
        recipes: payload.sort((a, b) => a.id - b.id),
      };
    case typeName.clearUserData:
      return {
        ...state,
        recipes: [],
      };
    case typeName.setRecipe:
      const isRecipeExists = state.recipes.some(
        (recipe) => recipe.id === payload.recipeId
      );
      const recipeData = {
        id: payload.recipeId,
        name: payload.recipeName,
        category: payload.recipeCategory,
        calories: Number(payload.recipeCalories),
        ingredients: payload.ingredientsArray,
        description: payload.recipeDescription,
      };
      if (isRecipeExists) {
        return {
          ...state,
          recipes: state.recipes.map((recipe) => {
            if (recipe.id === payload.recipeId) {
              return recipeData;
            } else {
              return recipe;
            }
          }),
        };
      } else {
        return {
          ...state,
          recipes: [...state.recipes, recipeData],
        };
      }
    case typeName.deleteRecipe:
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== payload),
      };
    default:
      return state;
  }
};

export { dietReducer, fetchUserData };
