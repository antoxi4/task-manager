'use strict';

import React, {Component} from 'react';
import ItemContainer from './itemContainer';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class MenuBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.mainContainer}>
        <ItemContainer isBorder={true}>
          <div style={styles.userIcon}>{this.props.userCutName}</div>
        </ItemContainer>
      </div>
    );
  }
}

const styles = {
  mainContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    zIndex: 20,
    backgroundColor: '#263238'
  },
  userIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0091EA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

MenuBar.propTypes = {
  userCutName: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    userCutName: state.user.cutName
  };
};

export default connect(mapStateToProps)(MenuBar);
