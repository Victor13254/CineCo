// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IteratorPage from './pages/IteratorPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/iterator" element={<IteratorPage />} />
        {/* otras rutas... */}
      </Routes>
    </Router>
  );
};

export default App;
