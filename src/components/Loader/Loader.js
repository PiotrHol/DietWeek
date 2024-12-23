import React from "react";
import "./loader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { HomeHeader } from "../HomeHeader/HomeHeader";
import { Menu } from "../Menu/Menu";

export const Loader = () => {
  return (
    <>
      <div className="home">
        <HomeHeader title="Strona główna" />
        <Menu url="#" />
      </div>
      <div className="loader">
        <FontAwesomeIcon className="loader__icon" icon={faCircleNotch} />
      </div>
    </>
  );
};
