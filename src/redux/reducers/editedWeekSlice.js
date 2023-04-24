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
      let summaryCalories = 0;
      let summaryCaloriesWeek = {};
      for (const dietDay of defaultDietWeek) {
        for (const dietDayDish of defaultDietDay) {
          if (state.weekDays[dietDay][dietDayDish][2]) {
            summaryCalories += state.weekDays[dietDay][dietDayDish][2];
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
      let summaryDayCalories = 0;
      for (const dietDayDish of defaultDietDay) {
        if (state.weekDays[payload][dietDayDish][2]) {
          summaryDayCalories += state.weekDays[payload][dietDayDish][2];
        }
      }
      return {
        ...state,
        weekCalories: {
          ...state.weekCalories,
          [payload]: summaryDayCalories,
        },
      };
    case typeName.setSingleRecipe:
      let tempWeekDays = {
        ...state.weekDays,
      };
      tempWeekDays[payload.day][payload.dish] = [
        payload.recipeId,
        payload.recipeName,
        payload.recipeCalories,
      ];
      return {
        ...state,
        weekDays: tempWeekDays,
      };
    default:
      return state;
  }
};

export default editedWeekReducer;
