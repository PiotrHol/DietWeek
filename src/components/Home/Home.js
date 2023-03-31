import React, { useEffect } from "react";
import "./home.scss";
import { Menu } from "../Menu/Menu";
import { HomeHeader } from "../HomeHeader/HomeHeader";
import { Switch, useRouteMatch } from "react-router-dom";
import { PrivateRoute } from "../../PrivateRoute";
import { fetchUserData } from "../../redux/reducers/dietSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Recipes } from "../Recipes/Recipes";

export const Home = () => {
  let { path, url } = useRouteMatch();
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData);
    }
    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className="home">
      <Switch>
        <PrivateRoute exact path={path}>
          <HomeHeader title="Strona główna" />
        </PrivateRoute>
        <PrivateRoute path={`${path}/recipes`}>
          <HomeHeader title="Przepisy" />
          <Recipes />
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
