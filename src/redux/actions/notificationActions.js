const typeName = {
  showNotification: "notification/showNotification",
  hideNotification: "notification/hideNotification",
};

const showNotification = (notificationText) => {
  return {
    type: typeName.showNotification,
    payload: notificationText,
  };
};

const hideNotification = () => {
  return {
    type: typeName.hideNotification,
  };
};

export { typeName, showNotification, hideNotification };
