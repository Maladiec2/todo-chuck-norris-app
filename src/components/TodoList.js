import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [addAtStart, setAddAtStart] = useState(true); // Track where to add todos

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = addAtStart ? [todo, ...todos] : [...todos, todo];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) => prev.map((item) => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleToggleChange = () => {
    setAddAtStart(!addAtStart); // Toggle between adding at start or end
  };

  // Function to handle dragging the todo items
  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // If the item is dropped outside the list, do nothing

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem); // Reorder the items based on drag
    setTodos(items);
  };

  return (
    <>
      <h1>Teamwork planner</h1>
      <div className="toggle-container">
        <label className="toggle-label">
          Add at {addAtStart ? "Start" : "End"}:
          <input 
            type="checkbox" 
            checked={addAtStart} 
            onChange={handleToggleChange} 
            className="slider-toggle"
          />
        </label>
      </div>

      <TodoForm onSubmit={addTodo} />

      {/* Wrapping the todo list in DragDropContext */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                  {(provided) => (
                    <div
                      className="todo-row"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Todo
                        key={todo.id}
                        todos={[todo]}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default TodoList;
