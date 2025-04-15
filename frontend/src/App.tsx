import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage';
import Portfolio from './components/Portfolio';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Welcome to the Finance Dashboard</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolios" element={<Portfolio />} />
        {/* Add more routes here as needed */}
      </Routes>
    </div>
  );
};

export default App;
