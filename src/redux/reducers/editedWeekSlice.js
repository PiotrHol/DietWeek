import { typeName } from "../actions/editedWeekActions";
import {
  defaultDietWeek,
  defaultDietDay,
} from "../../settings/recipesCategory";

const weekCaloriesInitialValues = {
  [defaultDietWeek[0]]: 0,
  [defaultDietWeek[1]]: 0,
  [defaultDietWeek[2]]: 0,
  [defaultDietWeek[3]]: 0,
  [defaultDietWeek[4]]: 0,
  [defaultDietWeek[5]]: 0,
  [defaultDietWeek[6]]: 0,
};

const initialState = {
  weekDays: {},
  weekCalories: { ...weekCaloriesInitialValues },
};

const editedWeekReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.setAllDays:
      return {
        ...state,
        weekDays: payload,
      };
    case typeName.clearWeek:
      return {
        ...state,
        weekDays: {},
        weekCalories: { ...weekCaloriesInitialValues },
      };
    case typeName.recalculateCalories:
      let tempRecipe = {};
      let summaryCalories = 0;
      let summaryCaloriesWeek = {};
      for (const dietDay of defaultDietWeek) {
        for (const dietDayDish of defaultDietDay) {
          if (payload[state.weekDays[dietDay][dietDayDish]]) {
            tempRecipe = payload[state.weekDays[dietDay][dietDayDish]];
            summaryCalories += tempRecipe.calories;
          }
        }
        summaryCaloriesWeek = {
          ...summaryCaloriesWeek,
          [dietDay]: summaryCalories,
        };
        summaryCalories = 0;
      }
      return {
        ...state,
        weekCalories: { ...summaryCaloriesWeek },
      };
    case typeName.recalculateDayCalories:
      let tempDayRecipe = {};
      let summaryDayCalories = 0;
      for (const dietDayDish of defaultDietDay) {
        if (payload.recipesObj[state.weekDays[payload.day][dietDayDish]]) {
          tempDayRecipe =
            payload.recipesObj[state.weekDays[payload.day][dietDayDish]];
          summaryDayCalories += tempDayRecipe.calories;
        }
      }
      return {
        ...state,
        weekCalories: {
          ...state.weekCalories,
          [payload.day]: summaryDayCalories,
        },
      };
    case typeName.setSingleRecipe:
      let tempWeekDays = {
        ...state.weekDays,
      };
      tempWeekDays[payload.day][payload.dish] = payload.recipeId;
      return {
        ...state,
        weekDays: tempWeekDays,
      };
    default:
      return state;
  }
};

export default editedWeekReducer;
