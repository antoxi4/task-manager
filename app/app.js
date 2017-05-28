'use strict';

import React from 'react';
import StoriesList from './components/storiesList';
import {
  Redirect,
  Route
} from 'react-router-dom';

const App = () => (
  <div style={styles.mainContainer}>
    <Redirect to={'/dashboard'}/>
    <Route path={'/dashboard'} component={StoriesList}/>
  </div>
);

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }
};

export default App;
