import "./scss/main.scss";
import { HashRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Redirect } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <HashRouter basename="/">
        <Switch>
          <PrivateRoute exact path="/">
            Home
          </PrivateRoute>
          <Route path="/login">
            <div className="App">
              <header className="App-header">
                <p>DietWeek app</p>
              </header>
            </div>
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
