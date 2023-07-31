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
        setIsLoading(false);
      }
    };
    getCalculation();
  }, [id]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!calculation) {
    return <div>Não foi possível encontrar o resultado.</div>;
  }

  return (
    <div>
      <h2>Detalhes do Cálculo</h2>
      <ul>
        <li>Quantidade de inversores: {calculation.numberInverters}</li>
        <li>Quantidade de placas: {calculation.numberPanels}</li>
        <li>Potência do painel utilizado (Watts): {calculation.panelPower}</li>
        <li>Área útil necessária para a instalação (metros quadrados): {calculation.requiredArea}</li>
        <li>Comprimento de estrutura necessário (metros): {calculation.requiredLength}</li>
      </ul>
    </div>
  );
};

export default DetalhesCalculo;
