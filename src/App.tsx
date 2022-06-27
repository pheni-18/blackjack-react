import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages';

function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
