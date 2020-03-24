import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../../navbar/header';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
  }) => (
    <Route {...rest} component={(props) => {
      return (
      isAuthenticated ? (
        <React.Fragment>
          <Header/>
          <Component {...props} />
        </React.Fragment>
      ) : (
        <Redirect to="/" />
      )
    )}} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loggedInUser: state.auth.loggedInUser
});

export default connect(mapStateToProps)(PrivateRoute);