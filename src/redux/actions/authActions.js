const typeName = {
  setUser: "auth/setUser",
  removeUser: "auth/removeUser",
  checkingUser: "auth/checkingUser",
};

const setUser = (payload) => {
  return {
    type: typeName.setUser,
    payload: { uid: payload.uid, email: payload.email },
  };
};

const removeUser = () => {
  return {
    type: typeName.removeUser,
  };
};

const setCheckingUser = (isChecking) => {
  return {
    type: typeName.checkingUser,
    payload: isChecking,
  };
};

export { typeName, setUser, removeUser, setCheckingUser };
