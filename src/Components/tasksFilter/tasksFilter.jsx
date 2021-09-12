import React from 'react';
import PropTypes from 'prop-types';
import './tasksFilter.css';

const TasksFilter = ({ label, hasClass, selecteFilter }) => {
  let className = '';

  if (hasClass) {
    className = 'selected';
  }

  return (
    <button type="button" className={className} onClick={selecteFilter}>
      {label}
    </button>
  );
};

TasksFilter.defaultProps = {
  label: '',
  hasClass: false,
  selecteFilter: () => {},
};

TasksFilter.propTypes = {
  label: PropTypes.string,
  hasClass: PropTypes.bool,
  selecteFilter: PropTypes.func,
};

export default TasksFilter;
