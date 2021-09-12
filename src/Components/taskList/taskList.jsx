import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import './taskList.css';

const TaskList = ({ tasks, onDeleted, onToggleDone, onToggleModified }) => (
  <ul className="todo-list">
    {tasks.map(({ label, done, hidden, modified, id, date, min, sec }) => (
      <Task
        key={id}
        min={min}
        sec={sec}
        date={date}
        done={done}
        label={label}
        hidden={hidden}
        modified={modified}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleModified={() => onToggleModified(id)}
      />
    ))}
  </ul>
);

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleModified: () => {},
};

TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleModified: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.any),
};

export default TaskList;
