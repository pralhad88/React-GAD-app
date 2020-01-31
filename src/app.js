import React from 'react';
import {render} from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
// import AppRouter from './routers/AppRouter';
import './styles/styles.css';
import {theme} from './theme/theme';
import configureStore from './store/config/configureStore';
import {logout} from './store/actions/auth';

import Providers from './providers'

const store = configureStore();
store.subscribe(()=>{
  // console.log(store.getState());
});

const App = () => (
  <Provider store={store}>
  <MuiThemeProvider theme={theme}>
    <Providers />
  </MuiThemeProvider>
  </Provider>
);

store.dispatch(logout());

render(<App />, document.getElementById('app'));