import React, { useEffect } from "react";
import "./scss/main.scss";
import { HashRouter, Switch, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  setUser,
  removeUser,
  setCheckingUser,
} from "./redux/actions/authActions";
import { setActiveWeek } from "./redux/actions/dietActions";
import { clearUserData } from "./redux/actions/dietActions";
import { PrivateRoute } from "./PrivateRoute";
import { Redirect } from "react-router-dom";
import { LogPage } from "./components/LogPage/LogPage";
import { Home } from "./components/Home/Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(getAuth(), (user) => {
      const initTimeoutId = setTimeout(() => {
        if (user) {
          dispatch(setUser(user));
          dispatch(setActiveWeek({}));
        } else {
          dispatch(removeUser());
          dispatch(clearUserData());
        }
        dispatch(setCheckingUser(false));
        clearTimeout(initTimeoutId);
      }, 500);
    });
    return () => {
      unsubscribeAuth();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      <HashRouter basename="/">
        <Switch>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <Route path="/login">
            <LogPage />
          </Route>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
