import React, { useState } from "react";
import "./logPage.scss";
import { Logo } from "../Logo/Logo";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import { Button } from "../Button/Button";

export const LogPage = () => {
  const [isNewAccountForm, setIsNewAccountForm] = useState(false);
  const [isRemindPasswordForm, setIsRemindPasswordForm] = useState(false);
  const [isRemindInfoText, setIsRemindInfoText] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    reset,
  } = useForm();
  const onNewAccountSubmit = (formData) => {
    console.log(formData);
  };
  const onRemindSubmit = (formData) => {
    console.log(formData);
    setIsRemindInfoText(true);
  };
  const onLogInSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className="log-page">
      <div className="log-page__logo">
        <Logo size={50} />
      </div>
      <div className="log-page__content">
        {isNewAccountForm ? (
          <form onSubmit={handleSubmit(onNewAccountSubmit)}>
            <FormInput
              inputName="email"
              labelText="Email"
              inputType="email"
              inputPlaceholder="Email"
              inputOptions={register("email", {
                required: "Podaj adres email",
                maxLength: {
                  value: 50,
                  message: "Podaj poprawny adres email",
                },
                pattern: {
                  // eslint-disable-next-line
                  value: /^[\w\.]+@([\w]+\.)+[\w]{2,4}$/gm,
                  message: "Podaj poprawny adres email",
                },
              })}
              formErrors={errors}
            />
            <FormInput
              inputName="password"
              labelText="Hasło"
              inputType="password"
              inputPlaceholder="Hasło"
              inputOptions={register("password", {
                required: "Podaj swoje hasło",
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
              inputName="repeatPassword"
              labelText="Powtórz hasło"
              inputType="password"
              inputPlaceholder="Hasło"
              inputOptions={register("repeatPassword", {
                required: "Podaj swoje hasło jeszcze raz",
                validate: {
                  theSame: (value) =>
                    watch("password") === value ||
                    "Hasła muszą być takie same!",
                },
              })}
              formErrors={errors}
            />
            <Button
              buttonStyle="primary"
              buttonText="Załóż konto"
              buttonTextSize={16}
              buttonFitWidth={false}
              buttonType="submit"
            />
            <Button
              buttonStyle="secondary"
              buttonText="Zaloguj się"
              buttonTextSize={16}
              buttonFitWidth={false}
              buttonHandleClick={() => {
                setIsNewAccountForm(false);
                setIsRemindPasswordForm(false);
                clearErrors();
                reset();
              }}
            />
          </form>
        ) : isRemindPasswordForm ? (
          <form onSubmit={handleSubmit(onRemindSubmit)}>
            {isRemindInfoText ? (
              <p className="log-page__remind-text">
                Na podany adres email została wysłana wiadomość z linkiem do
                przywrócenia hasła
              </p>
            ) : (
              <>
                <FormInput
                  inputName="email"
                  labelText="Email"
                  inputType="email"
                  inputPlaceholder="Email"
                  inputOptions={register("email", {
                    required: "Podaj adres email",
                    maxLength: {
                      value: 50,
                      message: "Podaj poprawny adres email",
                    },
                    pattern: {
                      // eslint-disable-next-line
                      value: /^[\w\.]+@([\w]+\.)+[\w]{2,4}$/gm,
                      message: "Podaj poprawny adres email",
                    },
                  })}
                  formErrors={errors}
                />
                <Button
                  buttonStyle="primary"
                  buttonText="Dalej"
                  buttonTextSize={16}
                  buttonFitWidth={false}
                  buttonType="submit"
                />
              </>
            )}
            <Button
              buttonStyle="tertiary"
              buttonText="Zaloguj się"
              buttonTextSize={14}
              buttonFitWidth={false}
              buttonHandleClick={() => {
                setIsNewAccountForm(false);
                setIsRemindPasswordForm(false);
                setIsRemindInfoText(false);
                clearErrors();
                reset();
              }}
            />
          </form>
        ) : (
          <form onSubmit={handleSubmit(onLogInSubmit)}>
            <FormInput
              inputName="email"
              labelText="Email"
              inputType="email"
              inputPlaceholder="Email"
              inputOptions={register("email", {
                required: "Podaj adres email",
                maxLength: {
                  value: 50,
                  message: "Podaj poprawny adres email",
                },
                pattern: {
                  // eslint-disable-next-line
                  value: /^[\w\.]+@([\w]+\.)+[\w]{2,4}$/gm,
                  message: "Podaj poprawny adres email",
                },
              })}
              formErrors={errors}
            />
            <FormInput
              inputName="password"
              labelText="Hasło"
              inputType="password"
              inputPlaceholder="Hasło"
              inputOptions={register("password", {
                required: "Podaj swoje hasło",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
                  message:
                    "Hasło powinno mieć: min. 8 znaków, max. 16 znaków, 1 dużą literę, 1 cyfrę i 1 znak specjalny",
                },
              })}
              formErrors={errors}
            />
            <Button
              buttonStyle="primary"
              buttonText="Zaloguj się"
              buttonTextSize={16}
              buttonFitWidth={false}
              buttonType="submit"
            />
            <Button
              buttonStyle="secondary"
              buttonText="Załóż konto"
              buttonTextSize={16}
              buttonFitWidth={false}
              buttonHandleClick={() => {
                setIsNewAccountForm(true);
                setIsRemindPasswordForm(false);
                clearErrors();
                reset();
              }}
            />
            <Button
              buttonStyle="tertiary"
              buttonText="Nie pamiętam hasła"
              buttonTextSize={14}
              buttonFitWidth={false}
              buttonHandleClick={() => {
                setIsNewAccountForm(false);
                setIsRemindPasswordForm(true);
                clearErrors();
                reset();
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
};
