import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../../navbar/header';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/landing" />
      ) : (
        <div>
        <Header />
        <div className="bodyComponent">
          <Component {...props} />
        </div>
        {/* <Footer/> */}
      </div>
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PublicRoute);