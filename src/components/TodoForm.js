import React, { useState } from 'react';

function TodoForm(props) {

  const [todo, setTodo] = useState(props.edit ? props.edit.value : '');
  const [priority, setPriority] = useState(props.edit ? props.edit.priority : ''); 
  const [owner, setOwner] = useState(props.edit ? props.edit.owner : '');

  const handleTodoChange = e => {
    setTodo(e.target.value);
  };

  const handlePriorityChange = e => {
    setPriority(e.target.value);
  };

  const handleOwnerChange = e => {
    setOwner(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: todo,
      priority: priority,
      owner: owner
    });

    setTodo('');
    setPriority('');
    setOwner('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your task'
            value={todo}
            onChange={handleTodoChange}
            name='text'
            className='todo-input edit'
          />
          <input
            placeholder='Update your priority'
            value={priority}
            onChange={handlePriorityChange}
            name='priority'
            className='todo-input edit'
          />
          <input
            placeholder='Update a owner'
            value={owner}
            onChange={handleOwnerChange}
            name='owner'
            className='todo-input'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a task'
            value={todo}
            onChange={handleTodoChange}
            name='text'
            className='todo-input'
          />
          <input
            placeholder='Add a priority'
            value={priority}
            onChange={handlePriorityChange}
            name='priority'
            className='todo-input'
          />
          <input
            placeholder='Add a owner'
            value={owner}
            onChange={handleOwnerChange}
            name='owner'
            className='todo-input'
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
