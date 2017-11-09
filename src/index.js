import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* eslint-disable no-undef */
ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
/* eslint-enable no-undef */
registerServiceWorker();
