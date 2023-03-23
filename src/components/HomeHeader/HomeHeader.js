import React from "react";
import "./homeHeader.scss";
import { Logo } from "../Logo/Logo";

export const HomeHeader = ({ title }) => {
  return (
    <div className="home-header">
      <h1 className="home-header__title">{title}</h1>
      <Logo size={30} />
    </div>
  );
};
