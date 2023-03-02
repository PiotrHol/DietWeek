import React, { useState } from "react";
import "./logPage.scss";
import { Logo } from "../Logo/Logo";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import { Button } from "../Button/Button";

export const LogPage = () => {
  const [isNewAccountForm, setIsNewAccountForm] = useState(false);
  const [isRemindPasswordForm, setIsRemindPasswordForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const onNewAccountSubmit = (formData) => {
    console.log(formData);
  };
  const onRemindSubmit = (formData) => {
    console.log(formData);
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
                maxLength: 50,
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
                maxLength: 50,
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
                maxLength: 50,
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
              }}
            />
          </form>
        ) : isRemindPasswordForm ? (
          <form onSubmit={handleSubmit(onRemindSubmit)}>
            <FormInput
              inputName="email"
              labelText="Email"
              inputType="email"
              inputPlaceholder="Email"
              inputOptions={register("email", {
                required: "Podaj adres email",
                maxLength: 50,
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
            <Button
              buttonStyle="tertiary"
              buttonText="Zaloguj się"
              buttonTextSize={14}
              buttonFitWidth={false}
              buttonHandleClick={() => {
                setIsNewAccountForm(false);
                setIsRemindPasswordForm(false);
                clearErrors();
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
                maxLength: 50,
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
                maxLength: 50,
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
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
};
