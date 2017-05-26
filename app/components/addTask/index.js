'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskDescription: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.taskDescription.length) {
      const {taskDescription} = this.state;

      this.setState({taskDescription: ''}, () => {
        this.props.addStoryTask(this.props.storyIndex, taskDescription);
      });
    }
  }

  render() {
    return (
      <input
        type={'text'}
        style={styles.input}
        placeholder={'New Task...'}
        onKeyPress={this.handleKeyPress}
        onChange={e => this.setState({taskDescription: e.target.value})}
        value={this.state.taskDescription}
      />
    );
  }
}

const styles = {
  input: {
    marginTop: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    border: 0,
    height: 40,
    outline: 'none',
  }
};

AddTask.propTypes = {
  storyIndex: PropTypes.number.isRequired,
  addStoryTask: PropTypes.func.isRequired
};

export default AddTask;
