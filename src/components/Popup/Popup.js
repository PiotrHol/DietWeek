import React, { useState, useEffect } from "react";
import "./popup.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

export const Popup = ({ popupTitle, popupCloseHandler, children }) => {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPopup(true);
      clearTimeout(timeoutId);
    }, 100);
  }, []);
  return (
    <div className={classNames("popup", { "popup--show": showPopup })}>
      <div
        className={classNames("popup__content", {
          "popup__content--show": showPopup,
        })}
      >
        <div className="popup__header">
          <div className="popup__header-title">{popupTitle}</div>
          <FontAwesomeIcon
            icon={faXmark}
            className="popup__header-close"
            onClick={popupCloseHandler}
          />
        </div>
        <div className="popup__main">{children}</div>
      </div>
    </div>
  );
};
