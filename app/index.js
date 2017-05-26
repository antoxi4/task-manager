'use strict';

import App from './app';
import React from 'react';
import store from './store';
import {render} from 'react-dom';
import {Provider} from 'react-redux';


import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

render((
  <Provider store={store}>
    <Router>
      <Route path={'/'} component={App}/>
    </Router>
  </Provider>
), document.getElementById('app'));
