'use strict';

import MenuBar from './menuBar';
import React, {Component} from 'react';
import StoriesList from './storiesList';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        <StoriesList />
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

export default Dashboard;
