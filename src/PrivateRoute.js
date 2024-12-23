import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "./components/Loader/Loader";

export const PrivateRoute = ({ children, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.userId);
  const isLoading = useSelector((state) => state.auth.checkingUser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoading ? (
          <Loader />
        ) : isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
};
