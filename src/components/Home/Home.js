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
import { Weeks } from "../Weeks/Weeks";
import { ActiveWeek } from "../ActiveWeek/ActiveWeek";
import { ShoppingList } from "../ShoppingList/ShoppingList";
import { Settings } from "../Settings/Settings";

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
          <ActiveWeek />
        </PrivateRoute>
        <PrivateRoute path={`${path}/recipes`}>
          <HomeHeader title="Przepisy" />
          <Recipes />
        </PrivateRoute>
        <PrivateRoute path={`${path}/weeks`}>
          <HomeHeader title="Tygodnie" />
          <Weeks />
        </PrivateRoute>
        <PrivateRoute path={`${path}/shopping-list`}>
          <HomeHeader title="Lista zakupów" />
          <ShoppingList />
        </PrivateRoute>
        <PrivateRoute path={`${path}/settings`}>
          <HomeHeader title="Ustawienia" />
          <Settings />
        </PrivateRoute>
      </Switch>
      <Menu url={url} />
    </div>
  );
};
