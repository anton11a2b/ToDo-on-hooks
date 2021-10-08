import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './tasksFilter.css';

const TasksFilter = ({ label, hasClass, selecteFilter }) => {
  const className = cn({
    selected: hasClass,
  });

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
