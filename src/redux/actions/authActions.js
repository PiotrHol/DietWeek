const typeName = {
  setUser: "auth/setUser",
  removeUser: "auth/removeUser",
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

export { typeName, setUser, removeUser };
