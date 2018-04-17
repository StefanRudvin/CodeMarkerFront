/*
App start for React

@TeamAlpha 2018
CodeMarker
*/

// Polyfills for IE11
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import './Css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
