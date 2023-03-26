const typeName = {
  setUserData: "diet/setUserData",
  clearUserData: "diet/clearUserData",
};

const setUserData = (payload) => {
  return {
    type: typeName.setUserData,
    payload,
  };
};

const clearUserData = () => {
  return {
    type: typeName.clearUserData,
  };
};

export { typeName, setUserData, clearUserData };
