'use strict';

import MenuBar from './components/menuBar';
import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'appMainContainer'}>
        <MenuBar />
        <div style={{display: 'flex', width: 60, height: 60, backgroundColor: '#268bd2'}}></div>
      </div>
    );
  }
}

export default App;
