import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasksFilter/tasksFilter';
import './footer.css';

const Footer = ({ filters, toDo, selecteFilter, clearCompleted }) => {
  const elements = filters.map(({ label, hasClass }) => (
    <li key={label}>
      <TasksFilter
        label={label}
        hasClass={hasClass}
        selecteFilter={(event) => selecteFilter(event.target.textContent)}
      />
    </li>
  ));
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <ul className="filters">{elements}</ul>
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  selecteFilter: () => {},
  clearCompleted: () => {},
  filters: [],
  toDo: 0,
};

Footer.propTypes = {
  selecteFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.any),
  toDo: PropTypes.number,
};

export default Footer;
