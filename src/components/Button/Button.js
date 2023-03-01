import React from "react";
import "./button.scss";
import classNames from "classnames";

export const Button = ({
  buttonStyle,
  buttonText,
  buttonTextSize,
  buttonHandleClick,
  buttonFitWidth = true,
  buttonType = null,
}) => {
  let buttonStyleClass = "";
  switch (buttonStyle) {
    case "primary":
      buttonStyleClass = "button--primary";
      break;
    case "secondary":
      buttonStyleClass = "button--secondary";
      break;
    case "tertiary":
      buttonStyleClass = "button--tertiary";
      break;
    default:
      buttonStyleClass = "button--primary";
      break;
  }
  const buttonCssStyle = {
    fontSize: `${buttonTextSize}px`,
    width: buttonFitWidth ? "fit-content" : "100%",
  };
  return (
    <button
      className={classNames("button", buttonStyleClass)}
      type={buttonType ? buttonType : "button"}
      onClick={buttonHandleClick ? buttonHandleClick : null}
      style={buttonCssStyle}
    >
      {buttonText}
    </button>
  );
};
