'use strict';

import React, {Component} from 'react';
import ItemContainer from './itemContainer';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class AddStoryButton extends Component {
  constructor(props) {
    super(props);

    this.userCutName = 'AN';
  }

  render() {
    return (
      <div className={'menuBarMainContainer'}>
        <ItemContainer isBorder={true}>
          <div className={'userIcon'} style={styles.userIcon}>{this.props.userCutName}</div>
        </ItemContainer>
        <ItemContainer isBorder={false} hovered={true}>
          <div className={'userIcon'} style={styles.userIcon}>{this.props.userCutName}</div>
        </ItemContainer>
      </div>
    );
  }
}

const styles = {
  userIcon: {
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
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStoryButton);
