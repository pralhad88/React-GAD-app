import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

import history from '../../utils/history';
import PublicRoute from './PublicRouter';
import PrivateRoute from './PrivateRouter';

import Login from '../../screens/Login';
import FirstLogin from '../../screens/FirstLogin';
import ForgetPass from '../../screens/ForgetPass';
import Register from '../../screens/Register';
import NotFound from '../../screens/NotFound';

const AppRouter = () => (
  <Router history={history}>
    <Switch>

      {/* Login Related */}
      <PublicRoute path="/" component={Login} exact={true} />
      <PublicRoute path="/linkedin" component={LinkedInPopUp} />
      <PublicRoute path="/firstLogin" component={FirstLogin} />
      <PublicRoute path="/forgetPassword" component={ForgetPass} exact={true} />
      {/* Registration page */} 
      <PublicRoute path="/register" component={Register} />

      {/* Anything that doesn't match the above routes would open the not found page. Need to be at the end always. */}
      <Route component={NotFound} />

    </Switch>
  </Router>
);

export default AppRouter;