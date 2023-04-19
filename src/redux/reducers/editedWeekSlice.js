import { typeName } from "../actions/editedWeekActions";
import {
  defaultDietWeek,
  defaultDietDay,
} from "../../settings/recipesCategory";

const initialState = {
  weekDays: {},
  weekCalories: 0,
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
        weekCalories: 0,
      };
    case typeName.recalculateCalories:
      let summaryCalories = 0;
      for (const dietDay of defaultDietWeek) {
        for (const dietDayDish of defaultDietDay) {
          if (state.weekDays[dietDay][dietDayDish][2]) {
            summaryCalories += state.weekDays[dietDay][dietDayDish][2];
          }
        }
      }
      return {
        ...state,
        weekCalories: summaryCalories,
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
