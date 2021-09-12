import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './newTaskForm.css';

const NewTaskForm = ({ minutes, seconds, onTaskAdded, onMinChange, onSecChange }) => {
  const [label, setLabel] = useState('');

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onSubmit = (event) => {
    if (event.keyCode === 13) {
      onTaskAdded(label);
      setLabel('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          autoFocus
          type="text"
          className="new-todo"
          value={label}
          onKeyDown={onSubmit}
          onChange={onLabelChange}
          placeholder="What needs to be done?"
        />
        <input
          min="0"
          max="59"
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={minutes}
          onKeyDown={onSubmit}
          onChange={onMinChange}
        />
        <input
          min="0"
          max="59"
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={seconds}
          onKeyDown={onSubmit}
          onChange={onSecChange}
        />
      </form>
    </header>
  );
};

NewTaskForm.defaultProps = {
  minutes: '',
  seconds: '',
  onTaskAdded: () => {},
  onSecChange: () => {},
  onMinChange: () => {},
};

NewTaskForm.propTypes = {
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  onTaskAdded: PropTypes.func,
  onSecChange: PropTypes.func,
  onMinChange: PropTypes.func,
};

export default NewTaskForm;
