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
    default:
      return state;
  }
};

export { dietReducer, fetchUserData };
