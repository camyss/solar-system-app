import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculo from './Components/calculo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/calculo" element={<Calculo />} />
      </Routes>
    </Router>
  );
};

export default App;
