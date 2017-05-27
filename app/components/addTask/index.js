'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskDescription: ''
    };

    this.confirmButtonIconURL = 'url("/img/ic_check.png")';
    this.dismissButtonIconURL = 'url("/img/ic_close.png")';

    this.renderTools = this.renderTools.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.confirmAddTask = this.confirmAddTask.bind(this);
    this.dismissAddTask = this.dismissAddTask.bind(this);
  }

  handleKeyDown(e) {
    const isTaskDescription = this.state.taskDescription.length;
    const isEnterPressed = e.key === 'Enter';
    const isEscapePressed = e.key === 'Escape';

    if (isEnterPressed && isTaskDescription) {
      this.confirmAddTask();
    }

    if (isEscapePressed) {
      this.dismissAddTask();
    }
  }

  confirmAddTask() {
    const {taskDescription} = this.state;

    this.setState({taskDescription: ''}, () => {
      this.props.addTask(this.props.storyId, taskDescription);
    });
  }

  dismissAddTask() {
    this.setState({taskDescription: ''});
  }

  renderTools() {
    return (
      <div style={styles.taskTools}>
        <div
          onClick={this.confirmAddTask}
          style={{
            ...styles.actionContainer,
            ...{backgroundImage: this.confirmButtonIconURL}
          }}
        />
        <div
          onClick={this.dismissAddTask}
          style={{
            ...styles.actionContainer,
            ...{backgroundImage: this.dismissButtonIconURL}
          }}
        />
      </div>
    );
  }

  render() {
    const tools = this.state.taskDescription.length ? this.renderTools() : null;

    return (
      <div style={styles.addTaskContainer}>
        <input
          type={'text'}
          style={styles.input}
          placeholder={'New Task...'}
          onKeyDown={this.handleKeyDown}
          onChange={e => this.setState({taskDescription: e.target.value})}
          value={this.state.taskDescription}
        />
        {tools}
      </div>
    );
  }
}

const styles = {
  addTaskContainer: {
    display: 'flex',
    marginTop: 10,
    position: 'relative',
    height: 40,
    minHeight: 40,
    backgroundColor: '#fff'
  },

  taskTools: {
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

AddTask.propTypes = {
  storyId: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired
};

export default AddTask;
