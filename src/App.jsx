import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculo from './Components/calculo';
import DetalhesCalculo from './Components/detalhesCalculo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/calculo" element={<Calculo />} />
        <Route path="/calculo/:id" element={<DetalhesCalculo />} />
      </Routes>
    </Router>
  );
};

export default App;
