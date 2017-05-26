'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class MenuBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'menuBarMainContainer'}>
      </div>
    );
  }
}

const styles = {
};

MenuBar.propTypes = {
  itemsCount: PropTypes.array.isRequired,
  addItem: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    itemsCount: state.test.itemsCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: () => {
      dispatch(TestActions.addItem());
    }
  };
};

export default MenuBar;
