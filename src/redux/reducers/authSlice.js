const initialState = {
  userId: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "auth/setUser":
      return {
        ...state,
        id: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
