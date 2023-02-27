import React, { useEffect, useState } from "react";
import "./scss/main.scss";
import { HashRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Redirect } from "react-router-dom";
import { DesktopNotAvailable } from "./components/DesktopNotAvailable/DesktopNotAvailable";

function App() {
  const [isDesktopView, setIsDesktopView] = useState(
    window.innerWidth > 768 ? true : false
  );
  useEffect(() => {
    const handleResize = () =>
      window.innerWidth > 768
        ? setIsDesktopView(true)
        : setIsDesktopView(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app">
      {isDesktopView ? (
        <DesktopNotAvailable />
      ) : (
        <HashRouter basename="/">
          <Switch>
            <PrivateRoute exact path="/">
              Home
            </PrivateRoute>
            <Route path="/login"></Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </HashRouter>
      )}
    </div>
  );
}

export default App;
