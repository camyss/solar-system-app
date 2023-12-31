import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { Link } from 'react-router-dom';
import { calculateSolarSystem } from '../Utils/solarSystem';
import { useEffect, useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBptfiFL7SePldqni4OuZvQISQR-yvPJdw",
  authDomain: "solar-calculator-7d4e0.firebaseapp.com",
  projectId: "solar-calculator-7d4e0",
});

const Calculo = () => {
  const [totalPower, setTotalPower] = useState('');
  const [panelPower_W, setPanelPower_W] = useState('');
  const [panelWidth, setPanelWidth] = useState('');
  const [panelHeight, setPanelHeight] = useState('');
  const [roofType, setRoofType] = useState('');
  const [resultado, setResultado] = useState(null);
  const [calculations, setCalculations] = useState([]);

  const db = getFirestore(firebaseApp);
  const calculationCollectionRef = collection(db, 'calculation');

  useEffect(() => {
    const getCalculation = async () => {
      const data = await getDocs(calculationCollectionRef);
      setCalculations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCalculation();
  }, [calculationCollectionRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Converting to number
    const potenciaTotal = parseFloat(totalPower);
    const potenciaPainel = parseFloat(panelPower_W);
    const larguraPainel = parseFloat(panelWidth);
    const alturaPainel = parseFloat(panelHeight);

    // Calling the function of results
    const result = calculateSolarSystem(
      potenciaTotal,
      potenciaPainel,
      larguraPainel,
      alturaPainel,
      roofType
    );

    // Update state with result
    setResultado(result);
    try {
      await addDoc(collection(db, 'calculation'), {
        result,
      });

      console.log('Data save', result);
    } catch (e) {
      console.error('Error to save: ', e);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Potência Total (kW):
          <input
            type="number"
            value={totalPower}
            onChange={(e) => setTotalPower(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block">
          Potência do Painel (W):
          <input
            type="number"
            value={panelPower_W}
            onChange={(e) => setPanelPower_W(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block">
          Largura do Painel (m):
          <input
            type="number"
            value={panelWidth}
            onChange={(e) => setPanelWidth(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block">
          Altura do Painel (m):
          <input
            type="number"
            value={panelHeight}
            onChange={(e) => setPanelHeight(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block">
          Tipo de Telhado:
          <input
            type="text"
            value={roofType}
            onChange={(e) => setRoofType(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <button className="w-full p-3 bg-violet-900 text-white font-bold rounded-full" type="submit">Calcular</button>
      </form>
      <h2 className="text-3xl font-bold mt-8">Resultados:</h2>
      <ul>
        {calculations.map((calculation) => (
          <li key={calculation.id}>
            <Link to={`/calculo/${calculation.id}`}>Detalhes do Cálculo {calculation.id}</Link>
          </li>
        ))}
      </ul>
    </div>

  );

};

export default Calculo;
