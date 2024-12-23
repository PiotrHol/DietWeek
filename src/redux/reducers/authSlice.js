import { typeName } from "../actions/authActions";

const initialState = {
  userId: null,
  userEmail: null,
  checkingUser: true,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.setUser:
      return {
        ...state,
        userId: payload.uid,
        userEmail: payload.email,
      };
    case typeName.removeUser:
      return {
        ...state,
        userId: null,
        userEmail: null,
      };
    case typeName.checkingUser:
      return {
        ...state,
        checkingUser: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
