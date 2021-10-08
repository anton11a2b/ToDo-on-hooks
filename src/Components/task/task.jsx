import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import DistanceToNow from '../distanceToNow/distanceToNow';
import Timer from '../timer/timer';
import './task.css';

const Task = ({ done, hidden, modified, onDeleted, onToggleDone, onToggleModified, min, sec, date, label }) => {
  const [title, setTitle] = useState(label);

  const onLabelChange = (event) => {
    setTitle(() => event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onToggleModified();
  };

  const className = cn({
    completed: done,
    hidden,
    editing: modified,
  });

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
        <label>
          <span className="title">{title}</span>
          <Timer min={min} sec={sec} />
          <DistanceToNow date={date} />
        </label>
        <button type="button" onClick={onToggleModified} className="icon icon-edit" />
        <button type="button" onClick={onDeleted} className="icon icon-destroy" />
      </div>
      {className.includes('editing') && (
        <form onSubmit={onSubmit}>
          <input onChange={onLabelChange} type="text" className="edit" value={title} autoFocus />
        </form>
      )}
    </li>
  );
};

Task.defaultProps = {
  min: '',
  sec: '',
  label: '',
  done: false,
  hidden: false,
  modified: false,
  date: new Date(),
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleModified: () => {},
};

Task.propTypes = {
  min: PropTypes.string,
  sec: PropTypes.string,
  label: PropTypes.string,
  done: PropTypes.bool,
  hidden: PropTypes.bool,
  modified: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleModified: PropTypes.func,
  date: PropTypes.instanceOf(Date),
};

export default Task;
