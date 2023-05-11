import { typeName, setUserData } from "../actions/dietActions";
import {
  getFirestore,
  getDocs,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";
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
  const weeks = await getDocs(
    collection(getFirestore(app), "users", getState().auth.userId, "weeks")
  );
  const weeksArray = [];
  weeks.forEach((week) => {
    weeksArray.push({
      ...week.data(),
      id: week.id,
    });
  });
  const activeWeekData = await getDoc(
    doc(getFirestore(app), "users", getState().auth.userId)
  );
  dispatch(setUserData(recipesArray, weeksArray, activeWeekData.data()));
};

const dietReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.setUserData:
      const activeWeekFromStore = payload.weeks.filter(
        (week) => week.id === payload.activeWeek.activeWeekId
      );
      return {
        ...state,
        recipes: payload.recipes.sort((a, b) => a.id - b.id),
        weeks: payload.weeks.sort((a, b) => a.id - b.id),
        activeWeek: {
          ...activeWeekFromStore[0],
          ingredients: payload.activeWeek.activeWeekIngredients,
        },
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
    case typeName.setWeek:
      const isWeekExists = state.weeks.some((week) => week.id === payload.id);
      if (isWeekExists) {
        return {
          ...state,
          weeks: state.weeks.map((week) => {
            if (week.id === payload.id) {
              return payload;
            } else {
              return week;
            }
          }),
        };
      } else {
        return {
          ...state,
          weeks: [...state.weeks, payload],
        };
      }
    case typeName.deleteWeek:
      return {
        ...state,
        weeks: state.weeks.filter((week) => week.id !== payload),
      };
    case typeName.setActiveWeek:
      return {
        ...state,
        activeWeek: payload,
      };
    case typeName.deleteActiveWeek:
      return {
        ...state,
        activeWeek: null,
      };
    case typeName.checkIngredient:
      return {
        ...state,
        activeWeek: {
          ...state.activeWeek,
          ingredients: {
            ...state.activeWeek.ingredients,
            [payload.key]: {
              ...state.activeWeek.ingredients[payload.key],
              check: payload.value,
            },
          },
        },
      };
    default:
      return state;
  }
};

export { dietReducer, fetchUserData };
