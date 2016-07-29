/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


// Routes
import Routes from './common/components/Routes';

// Base styling
import './common/base.css';

const theme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

// Render the router
ReactDOM.render((
  <MuiThemeProvider muiTheme={theme}>
  <Router history={browserHistory}>
    {Routes}
  </Router>
  </MuiThemeProvider>
), document.getElementById(DOM_APP_EL_ID));

//thix is a test

