import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const DetalhesCalculo = ({ calculations }) => {
  const { id } = useParams();
  const [calculation, setCalculation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const calculationRef = doc(db, 'calculation', id);

    const getCalculation = async () => {
      try {
        const docSnap = await getDoc(calculationRef);
        if (docSnap.exists()) {
          setCalculation(docSnap.data().result);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setIsLoading(false); // Loading done
      }
    };
    getCalculation();
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-2xl">Carregando...</div>;
  }

  if (!calculation) {
    return <div className="flex justify-center items-center h-screen text-2xl">Não foi possível encontrar o resultado.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-4">Detalhes do Cálculo</h2>
      <ul>
        <li className="mb-2">Quantidade de inversores: {calculation.numberInverters}</li>
        <li className="mb-2">Quantidade de placas: {calculation.numberPanels}</li>
        <li className="mb-2">Potência do painel utilizado (Watts): {calculation.panelPower}</li>
        <li className="mb-2">Área útil necessária para a instalação (metros quadrados): {calculation.requiredArea}</li>
        <li className="mb-2">Comprimento de estrutura necessário (metros): {calculation.requiredLength}</li>
      </ul>
    </div>
  );
};


export default DetalhesCalculo;
