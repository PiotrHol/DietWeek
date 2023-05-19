import { typeName } from "../actions/notificationActions";

const initialState = {
  isShow: false,
  text: "",
};

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.showNotification:
      return {
        ...state,
        isShow: true,
        text: payload,
      };
    case typeName.hideNotification:
      return {
        ...state,
        isShow: false,
        text: "",
      };
    default:
      return state;
  }
};

export default notificationReducer;
