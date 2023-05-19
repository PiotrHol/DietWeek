import React, { useEffect, useState } from "react";
import "./notification.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hideNotification } from "../../redux/actions/notificationActions";

export const Notification = () => {
  const isShowNotification = useSelector((state) => state.notification.isShow);
  const notificationText = useSelector((state) => state.notification.text);
  const [hideIntervalId, setHideIntervalId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isShowNotification && !hideIntervalId) {
      setHideIntervalId(
        setInterval(() => {
          dispatch(hideNotification());
          clearInterval(hideIntervalId);
        }, 3000)
      );
    } else if (isShowNotification) {
      clearInterval(hideIntervalId);
      setHideIntervalId(
        setInterval(() => {
          dispatch(hideNotification());
          clearInterval(hideIntervalId);
        }, 3000)
      );
    }
    // eslint-disable-next-line
  }, [notificationText]);

  if (isShowNotification) {
    return (
      <div className="notification">
        <div className="notification__content">{notificationText}</div>
      </div>
    );
  } else {
    return null;
  }
};
