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
  recipes: {},
  weeks: [],
  activeWeek: null,
};

const fetchUserData = async (dispatch, getState) => {
  const recipes = await getDocs(
    collection(getFirestore(app), "users", getState().auth.userId, "recipes")
  );
  let recipesObj = {};
  recipes.forEach((recipe) => {
    recipesObj = {
      ...recipesObj,
      [recipe.id]: {
        ...recipe.data(),
        id: recipe.id,
      },
    };
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
  dispatch(setUserData(recipesObj, weeksArray, activeWeekData.data()));
};

const dietReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.setUserData:
      const activeWeekFromStore = payload.weeks.filter(
        (week) => week.id === payload.activeWeek.activeWeekId
      );
      return {
        ...state,
        recipes: payload.recipes,
        weeks: payload.weeks.sort((a, b) => a.id - b.id),
        activeWeek:
          payload.activeWeek.activeWeekId && activeWeekFromStore
            ? {
                ...activeWeekFromStore[0],
                ingredients: payload.activeWeek.activeWeekIngredients,
              }
            : null,
      };
    case typeName.clearUserData:
      return {
        ...state,
        recipes: {},
        weeks: [],
        activeWeek: null,
      };
    case typeName.setRecipe:
      let tempRecipesObj = state.recipes;
      const recipeData = {
        id: payload.recipeId,
        name: payload.recipeName,
        category: payload.recipeCategory,
        calories: Number(payload.recipeCalories),
        ingredients: payload.ingredientsArray,
        description: payload.recipeDescription,
      };
      tempRecipesObj = {
        ...tempRecipesObj,
        [payload.recipeId]: {
          ...recipeData,
        },
      };
      return {
        ...state,
        recipes: tempRecipesObj,
      };
    case typeName.deleteRecipe:
      let tempRecipesObjToSet = state.recipes;
      delete tempRecipesObjToSet[payload];
      return {
        ...state,
        recipes: { ...tempRecipesObjToSet },
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
