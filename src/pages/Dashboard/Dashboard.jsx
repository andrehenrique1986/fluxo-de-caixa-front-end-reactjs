import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import BarrasHorizontais from "../../components/Graficos/BarrasHorizontais";
import BarrasVerticais from "../../components/Graficos/BarrasVerticais";
import Cards from "../../components/Graficos/Cards";
import GraficoPizza from "../../components/Graficos/GraficoPizza";

const ContainerPrincipal = styled.div`
  ${tw``}
`;

const ContainerGrade = styled.div`
  ${tw`grid grid-cols-2 gap-4 w-full max-w-4xl p-4`} // Ajuste o tamanho da grade conforme necessário
`;

const Quadrado = styled.div`
  ${tw`flex items-center justify-center p-4 bg-white shadow-md rounded-lg`}
  height: 100%;
  font-size: 0.875rem;
`;

const Dashboard = () => {
  return (
    <ContainerPrincipal className="flex flex-col items-center">
      <ContainerGrade>
        <Quadrado>
          <BarrasHorizontais/>
        </Quadrado>
        <Quadrado>
        <Cards />
        </Quadrado>
        <Quadrado>
        <BarrasVerticais />
        </Quadrado>
        <Quadrado>
          <GraficoPizza />
        </Quadrado>
      </ContainerGrade>
    </ContainerPrincipal>
  );
};

export default Dashboard;







