import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';


const AuthenticatedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}

    render={props => isAuthenticated ?
      <Component {...props} />
      :
      <Redirect to={{
        pathname: "/login",
        state: { from: props.location }
      }}
      />
    }
  />
);

AuthenticatedRoute.propTypes = {
  component: PropTypes.any,
  isAuthenticated: PropTypes.bool.isRequired,
  rest: PropTypes.any
};

export default AuthenticatedRoute;
