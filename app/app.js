'use strict';

import React, {Component} from 'react';
import DashBoard from './components/dashboard';
import {
  Redirect,
  Route
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        <Redirect to={'/dashboard'}/>
        <Route path={'/dashboard'} component={DashBoard}/>
      </div>
    );
  }
}

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }
};

export default App;
