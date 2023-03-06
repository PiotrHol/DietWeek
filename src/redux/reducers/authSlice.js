import { typeName } from "../actions/authActions";

const initialState = {
  userId: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.setUser:
      return {
        ...state,
        userId: payload,
      };
    case typeName.removeUser:
      return {
        ...state,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
