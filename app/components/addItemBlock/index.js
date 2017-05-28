'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddItemBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: ''
    };

    this.confirmButtonIconURL = 'url("/img/ic_check.png")';
    this.dismissButtonIconURL = 'url("/img/ic_close.png")';

    this.handleInputChanges = this.handleInputChanges.bind(this);
    this.renderTools = this.renderTools.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.confirmItem = this.confirmItem.bind(this);
    this.dismissItem = this.dismissItem.bind(this);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.refs.blockInput.focus();
    }
  }

  handleKeyDown(e) {
    const isItemName = this.state.itemName.length;
    const isEnterPressed = e.key === 'Enter';
    const isEscapePressed = e.key === 'Escape';

    if (isEnterPressed && isItemName) {
      this.confirmItem();
    }

    if (isEscapePressed) {
      this.dismissItem();
    }
  }

  confirmItem() {
    const {itemName} = this.state;

    this.setState({itemName: ''}, () => {
      this.props.confirmEvent(itemName);
    });
  }

  dismissItem() {
    this.setState({itemName: ''}, this.props.dismissEvent);
  }

  renderTools() {
    return (
      <div style={styles.toolsContainer}>
        <div
          onClick={this.confirmItem}
          style={{
            ...styles.actionContainer,
            ...{backgroundImage: this.confirmButtonIconURL}
          }}
        />
        <div
          onClick={this.dismissItem}
          style={{
            ...styles.actionContainer,
            ...{backgroundImage: this.dismissButtonIconURL}
          }}
        />
      </div>
    );
  }

  handleInputChanges(event) {
    this.setState({itemName: event.target.value});
  }

  render() {
    const tools = this.state.itemName.length ? this.renderTools() : null;

    return (
      <div style={{...styles.addItemContainer, ...this.props.wrapperStyle}}>
        <input
          type={'text'}
          ref={'blockInput'}
          style={{...styles.input, ...this.props.inputStyle}}
          className={this.props.inputClassName}
          placeholder={this.props.inputPlaceHolder}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleInputChanges}
          value={this.state.itemName}
        />
        {tools}
      </div>
    );
  }
}

const styles = {
  addItemContainer: {
    display: 'flex',
    position: 'relative',
    height: 40,
    border: '1px solid #CFD8DC'
  },

  toolsContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    right: 0,
    top: 0,
    bottom: 0,
    width: 50,
  },

  input: {
    display: 'flex',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 50,
    border: 0,
    outline: 'none'
  },

  actionContainer: {
    display: 'flex',
    cursor: 'pointer',
    width: 22,
    height: 20,
    backgroundSize: 15,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
};

AddItemBlock.propTypes = {
  autoFocus: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  inputClassName: PropTypes.string,
  inputPlaceHolder: PropTypes.string.isRequired,
  confirmEvent: PropTypes.func,
  dismissEvent: PropTypes.func
};

AddItemBlock.defaultProps = {
  autoFocus: false,
  wrapperStyle: {},
  inputStyle: {},
  inputClassName: '',
  confirmEvent: () => null,
  dismissEvent: () => null
};

export default AddItemBlock;
