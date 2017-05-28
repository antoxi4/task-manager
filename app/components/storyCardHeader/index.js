'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddItemBlock from '../addItemBlock';

class StoryCardHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false
    };

    this.renderEditableHeader = this.renderEditableHeader.bind(this);
    this.renderDefaultHeader = this.renderDefaultHeader.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.setStoryName = this.setStoryName.bind(this);
  }

  setEditMode(isEditMode) {
    this.setState({isEditMode});
  }

  setStoryName(storyName) {
    this.props.changeStoryName(storyName);
    this.setEditMode(false);
  }

  renderEditableHeader() {
    return (
      <AddItemBlock
        autoFocus={true}
        clearOnDismiss={false}
        clearOnConfirm={false}
        dismissEvent={() => this.setEditMode(false)}
        confirmEvent={this.setStoryName}
        wrapperStyle={styles.editableHeaderWrapperStyle}
        defaultValue={this.props.storyName}
        inputStyle={styles.editableHeaderInputStyle}
        inputPlaceHolder={'Story Name'}
      />
    );
  }

  renderDefaultHeader() {
    return (
      <div onDoubleClick={() => this.setEditMode(true)} style={styles.cardHeader}>
        <div style={styles.cardName}>{this.props.storyName}</div>
        <div onClick={this.props.deleteStory} style={styles.deleteButton} className={'hoverGlow'} />
      </div>
    );
  }

  render() {
    if (this.state.isEditMode) {
      return this.renderEditableHeader();
    }

    return this.renderDefaultHeader();
  }
}

const styles = {
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    border: '1px solid #CFD8DC',
    backgroundColor: '#263238'
  },

  cardName: {
    color: '#fff',
    paddingLeft: 14,
    alignItems: 'center',
    fontSize: '10pt',
    display: 'flex',
    flex: 1
  },

  deleteButton: {
    display: 'flex',
    cursor: 'pointer',
    width: 45,
    backgroundPosition: 'center',
    backgroundSize: 25,
    backgroundRepeat: 'no-repeat',
    height: 45,
    backgroundImage: 'url("/img/ic_delete.png")'
  },

  addTaskWrapperStyle: {
    marginTop: 10
  },

  editableHeaderWrapperStyle: {
    height: 45
  },

  editableHeaderInputStyle: {
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#263238'
  }
};

StoryCardHeader.propTypes = {
  storyName: PropTypes.string.isRequired,
  deleteStory: PropTypes.func.isRequired,
  changeStoryName: PropTypes.func.isRequired
};

export default StoryCardHeader;
