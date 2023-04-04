import React from "react";
import "./fixedButton.scss";

export const FixedButton = ({
  buttonText,
  buttonTextSize,
  buttonHandleClick,
}) => {
  const buttonCssStyle = {
    fontSize: `${buttonTextSize}px`,
    lineHeight: `${buttonTextSize}px`,
  };
  const onDefaultButtonClick = (e) => {
    e.preventDefault();
    buttonHandleClick();
  };
  return (
    <button
      className="fixed-button"
      onClick={buttonHandleClick ? (e) => onDefaultButtonClick(e) : null}
      style={buttonCssStyle}
    >
      {buttonText}
    </button>
  );
};
