import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { userEmail } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!userEmail ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/signin"} />
        )
      }
    />
  );
};

export default PrivateRoute;
