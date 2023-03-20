import React from "react";
import "./home.scss";
import { Logo } from "../Logo/Logo";
import { Menu } from "../Menu/Menu";

export const Home = () => {
  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__title">Strona główna</h1>
        <Logo size={30} />
      </div>
      <Menu />
    </div>
  );
};
