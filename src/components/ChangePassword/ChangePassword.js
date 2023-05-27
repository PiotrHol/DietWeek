import React, { useState, useEffect } from "react";
import "./changePassword.scss";
import { FormInput } from "../FormInput/FormInput";
import { useForm } from "react-hook-form";
import { Button } from "../Button/Button";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notificationActions";

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const [submitError, setSubmitError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (submitError) {
      const submitErrorTimeout = setTimeout(() => {
        setSubmitError(null);
        clearTimeout(submitErrorTimeout);
      }, 3000);
    }
  }, [submitError]);

  const onChangePasswordSubmit = async ({ oldPassword, newPassword }) => {
    const auth = getAuth();
    try {
      const credentaial = EmailAuthProvider.credential(userEmail, oldPassword);
      await reauthenticateWithCredential(auth.currentUser, credentaial);
      await updatePassword(auth.currentUser, newPassword);
      dispatch(showNotification("Hasło zostało zmienione"));
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          setSubmitError("Niepoprawne stare hasło!");
          break;
        default:
          setSubmitError("Niepoprawne dane!");
          break;
      }
    }
    reset();
  };

  return (
    <div className="change-password">
      <div className="change-password__title">Zmień hasło</div>
      <form onSubmit={handleSubmit(onChangePasswordSubmit)}>
        <FormInput
          inputName="oldPassword"
          labelText="Stare hasło"
          inputType="password"
          inputPlaceholder="Stare hasło"
          inputOptions={register("oldPassword", {
            required: "Podaj swoje stare hasło",
            pattern: {
              value:
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
              message:
                "Hasło powinno mieć: min. 8 znaków, max. 16 znaków, 1 dużą literę, 1 cyfrę i 1 znak specjalny",
            },
          })}
          formErrors={errors}
        />
        <FormInput
          inputName="newPassword"
          labelText="Nowe hasło"
          inputType="password"
          inputPlaceholder="Nowe hasło"
          inputOptions={register("newPassword", {
            required: "Podaj swoje nowe hasło",
            pattern: {
              value:
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
              message:
                "Hasło powinno mieć: min. 8 znaków, max. 16 znaków, 1 dużą literę, 1 cyfrę i 1 znak specjalny",
            },
            validate: {
              theSame: (value) =>
                watch("oldPassword") !== value ||
                "Nowe hasło musi się różnić od starego!",
            },
          })}
          formErrors={errors}
        />
        <FormInput
          inputName="repeatNewPassword"
          labelText="Powtórz nowe hasło"
          inputType="password"
          inputPlaceholder="Powtórz nowe hasło"
          inputOptions={register("repeatNewPassword", {
            required: "Podaj swoje nowe hasło jeszcze raz",
            validate: {
              theSame: (value) =>
                watch("newPassword") === value ||
                "Nowe hasła muszą być takie same!",
            },
          })}
          formErrors={errors}
        />
        {submitError ? (
          <p className="change-password__error">{submitError}</p>
        ) : null}
        <Button
          buttonStyle="secondary"
          buttonText="Zmień hasło"
          buttonTextSize={16}
          buttonFitWidth={false}
          buttonType="submit"
        />
      </form>
    </div>
  );
};
