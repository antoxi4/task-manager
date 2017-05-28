'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddItemBlock from '../addItemBlock';

class AddStoryBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActiveAddStoryBlock: false
    };

    this.setAddStoryBlockState = this.setAddStoryBlockState.bind(this);
    this.renderAddStoryButton = this.renderAddStoryButton.bind(this);
    this.renderAddStoryBlock = this.renderAddStoryBlock.bind(this);
  }

  setAddStoryBlockState(state) {
    this.setState({isActiveAddStoryBlock: state});
  }

  renderAddStoryButton() {
    return (
      <div
        onClick={() => this.setAddStoryBlockState(true)}
        style={styles.addStoryButton}
        className={'hoverGlow'}
      />
    );
  }

  renderAddStoryBlock() {
    return (
      <AddItemBlock
        autoFocus={true}
        inputClassName={'whiteInputPlaceHolder'}
        wrapperStyle={styles.addStoryWrapperStyle}
        inputPlaceHolder={'New Story...'}
        inputStyle={styles.addStoryInputStyle}
        confirmEvent={this.props.addStory}
        dismissEvent={() => this.setAddStoryBlockState(false)}
      />
    );
  }

  render() {
    const addStoryBlock = this.renderAddStoryBlock();
    const addStoryButton = this.renderAddStoryButton();

    if (this.state.isActiveAddStoryBlock) {
      return addStoryBlock;
    }

    return addStoryButton;
  }
}

const styles = {
  addStoryButton: {
    height: 45,
    width: 45,
    cursor: 'pointer',
    border: '1px solid #CFD8DC',
    marginRight: 10,
    backgroundImage: 'url("/img/ic_add.png")',
    backgroundSize: 25,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },

  addStoryWrapperStyle: {
    width: 240,
    height: 45,
    marginRight: 10
  },

  addStoryInputStyle: {
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#263238'
  }
};

AddStoryBlock.propTypes = {
  addStory: PropTypes.func.isRequired
};

export default AddStoryBlock;
