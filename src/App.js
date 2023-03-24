import React, { useEffect, useState } from "react";
import "./scss/main.scss";
import { HashRouter, Switch, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser, removeUser } from "./redux/actions/authActions";
import { PrivateRoute } from "./PrivateRoute";
import { Redirect } from "react-router-dom";
import { DesktopNotAvailable } from "./components/DesktopNotAvailable/DesktopNotAvailable";
import { LogPage } from "./components/LogPage/LogPage";
import { Home } from "./components/Home/Home";

function App() {
  const [isDesktopView, setIsDesktopView] = useState(
    window.innerWidth > 768 ? true : false
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(removeUser());
      }
    });
    const handleResize = () =>
      window.innerWidth > 768
        ? setIsDesktopView(true)
        : setIsDesktopView(false);
    window.addEventListener("resize", handleResize);
    return () => {
      unsubscribeAuth();
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      {isDesktopView ? (
        <DesktopNotAvailable />
      ) : (
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
      )}
    </div>
  );
}

export default App;
