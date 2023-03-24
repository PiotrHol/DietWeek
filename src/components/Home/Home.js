import React from "react";
import "./home.scss";
import { Menu } from "../Menu/Menu";
import { HomeHeader } from "../HomeHeader/HomeHeader";
import { Switch, useRouteMatch } from "react-router-dom";
import { PrivateRoute } from "../../PrivateRoute";

export const Home = () => {
  let { path, url } = useRouteMatch();
  return (
    <div className="home">
      <Switch>
        <PrivateRoute exact path={path}>
          <HomeHeader title="Strona główna" />
        </PrivateRoute>
        <PrivateRoute path={`${path}/recipes`}>
          <HomeHeader title="Przepisy" />
        </PrivateRoute>
        <PrivateRoute path={`${path}/weeks`}>
          <HomeHeader title="Tygodnie" />
        </PrivateRoute>
        <PrivateRoute path={`${path}/shopping-list`}>
          <HomeHeader title="Lista zakupów" />
        </PrivateRoute>
        <PrivateRoute path={`${path}/settings`}>
          <HomeHeader title="Ustawienia" />
        </PrivateRoute>
      </Switch>
      <Menu url={url} />
    </div>
  );
};
