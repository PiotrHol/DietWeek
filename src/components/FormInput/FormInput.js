import React from "react";
import "./formInput.scss";
import classNames from "classnames";

export const FormInput = ({
  inputName,
  labelText,
  inputType,
  inputPlaceholder,
  inputOptions,
  formErrors,
}) => {
  return (
    <div className="form-input">
      <label className="form-input__content">
        <div className="form-input__label">{labelText}</div>
        <input
          className={classNames("form-input__input", {
            "form-input__input--error": formErrors[inputName],
          })}
          type={inputType}
          placeholder={inputPlaceholder}
          {...inputOptions}
        />
      </label>
      {formErrors[inputName] && (
        <p className="form-input__error">{formErrors[inputName].message}</p>
      )}
    </div>
  );
};
