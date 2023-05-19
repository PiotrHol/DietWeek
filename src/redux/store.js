import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./reducers/authSlice";
import { dietReducer } from "./reducers/dietSlice";
import editedWeekReducer from "./reducers/editedWeekSlice";
import notificationReducer from "./reducers/notificationSlice";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  diet: dietReducer,
  editedWeek: editedWeekReducer,
  notification: notificationReducer,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, composedEnhancer);

export default store;
