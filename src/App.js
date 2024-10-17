import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import ChuckNorrisJokes from './components/ChuckNorrisJokes';
import Navigation from './components/Navigation'; // Assuming you have a navigation component

function App() {
  return (
    <Router>
      <div className='todo-app'>
        <Navigation /> {/* Add navigation to switch between pages */}
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/jokes" element={<ChuckNorrisJokes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
