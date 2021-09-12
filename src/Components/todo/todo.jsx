import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Footer from '../footer/footer';
import TaskList from '../taskList/taskList';
import NewTaskForm from '../newTaskForm/newTaskForm';
import './todo.css';

const Todo = () => {
  function createTask(label, min, sec) {
    return {
      sec,
      min,
      label,
      id: uuid(),
      done: false,
      hidden: false,
      modified: false,
      isStarted: false,
      date: new Date(),
    };
  }

  function createFilter(label, hasClass) {
    return {
      label,
      hasClass,
    };
  }

  const [todoData, setTodoData] = useState([
    createTask('Completed task', '12', '30'),
    createTask('Editing task', '12', '30'),
    createTask('Active task', '12', '30'),
  ]);

  const [filtersData, setFiltersData] = useState([
    createFilter('All', true),
    createFilter('Active', false),
    createFilter('Completed', false),
  ]);

  const [activeFilter, setActiveFilter] = useState('All');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const deleteDoneTasks = () => {
    setTodoData((todoData) => todoData.filter((el) => !el.done));
  };

  const onSelected = (label) => {
    setFiltersData((filtersData) =>
      filtersData.map((el) => {
        if (el.label !== label) {
          return { ...el, hasClass: false };
        }

        return { ...el, hasClass: true };
      })
    );

    setActiveFilter(() => label);
  };

  const deleteTask = (id) => {
    setTodoData((todoData) => todoData.filter((el) => el.id !== id));
  };

  const addTask = (label) => {
    let min = minutes;
    let sec = seconds;

    if (Number(minutes) < 10) {
      min = `0${Number(minutes)}`;
    }

    if (seconds < 10) {
      sec = `0${Number(seconds)}`;
    }

    if (label) {
      const newTask = createTask(label, min, sec);

      setTodoData((todoData) => [...todoData, newTask]);
      setMinutes(() => '');
      setSeconds(() => '');
    }
  };

  const onToggleDone = (id) => {
    setTodoData((todoData) =>
      todoData.map((el) => {
        if (el.id === id) {
          return { ...el, done: !el.done };
        }

        return el;
      })
    );
  };

  const onToggleModified = (id) => {
    setTodoData((todoData) =>
      todoData.map((el) => {
        if (el.id === id) {
          return { ...el, modified: !el.modified };
        }

        return el;
      })
    );
  };

  const onMinChange = (event) => {
    let min = event.target.value;

    if (Number(min) > 59) {
      min = '59';
    }

    setMinutes(() => min);
  };

  const onSecChange = (event) => {
    let sec = event.target.value;

    if (Number(sec) > 59) {
      sec = '59';
    }

    setSeconds(() => sec);
  };

  function checkActiveFilter(activeFilter, el) {
    switch (activeFilter) {
      case 'Active':
        if (el.done) {
          return { ...el, hidden: true };
        }

        return { ...el, hidden: false };
      case 'Completed':
        if (!el.done) {
          return { ...el, hidden: true };
        }

        return { ...el, hidden: false };
      default:
        return null;
    }
  }

  const todoCount = todoData.filter((el) => !el.done).length;
  const todoDataForRender =
    activeFilter === 'All' ? todoData : todoData.map((el) => checkActiveFilter(activeFilter, el));

  return (
    <section className="todoapp">
      <NewTaskForm
        minutes={minutes}
        seconds={seconds}
        onTaskAdded={addTask}
        onMinChange={onMinChange}
        onSecChange={onSecChange}
      />
      <section className="main">
        <TaskList
          tasks={todoDataForRender}
          onDeleted={deleteTask}
          onToggleDone={onToggleDone}
          onToggleModified={onToggleModified}
        />
        <Footer toDo={todoCount} filters={filtersData} selecteFilter={onSelected} clearCompleted={deleteDoneTasks} />
      </section>
    </section>
  );
};

export default Todo;
