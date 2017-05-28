'use strict';

import React from 'react';
import StoriesList from './storiesList';

const Dashboard = () => (
  <div style={styles.mainContainer}>
    <StoriesList />
  </div>
);

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }
};

export default Dashboard;
