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
import Logout from '../../screens/Logout';
import GoogleMap from '../../componenet/googleMap';
import ContactUs from "../../componenet/contactUs";

const AppRouter = () => (
  <Router history={history}>
    <Switch>

      {/* Login Related */}
      <PublicRoute path="/" component={Login} exact={true} />
      <PublicRoute path="/linkedin" component={LinkedInPopUp} />
      <PublicRoute path="/firstLogin" component={FirstLogin} />
      <PublicRoute path="/forgetPassword" component={ForgetPass} /> 
      <PublicRoute path="/register" component={Register} />
      <PrivateRoute path="/contact-us" component={ContactUs} />

      {/* Landing Page Related */}
      <PrivateRoute path="/logout" component={Logout} />
      <PrivateRoute path="/landing" component={GoogleMap} />
      
      {/* Anything that doesn't match the above routes would open the not found page. Need to be at the end always. */}
      <Route component={NotFound} />

    </Switch>
  </Router>
);

export default AppRouter;