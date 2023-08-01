import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Calculo from './Components/calculo';
import DetalhesCalculo from './Components/detalhesCalculo';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/calculo" />} />
        <Route path="/calculo" element={<Calculo />} />
        <Route path="/calculo/:id" element={<DetalhesCalculo />} />
      </Routes>
    </Router>
  );
};

export default App;
