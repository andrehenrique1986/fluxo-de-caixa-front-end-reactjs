import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import BarrasHorizontais from "../../components/Graficos/BarrasHorizontais";
import BarrasVerticais from "../../components/Graficos/BarrasVerticais";
import Cards from "../../components/Graficos/Cards";
import GraficoPizza from "../../components/Graficos/GraficoPizza";

const ContainerPrincipal = styled.div`
  ${tw`flex 
       flex-col 
       items-center`}
`;

const ContainerGrade = styled.div`
  ${tw`grid 
       xl:grid-cols-2 
       gap-4 
       w-full 
       max-w-4xl 
       p-4`}
`;

const Quadrado = styled.div`
  ${tw`flex 
       items-center 
       justify-center 
       p-4 
       bg-white 
       shadow-md 
       rounded-lg 
       h-full 
       text-sm`}
`;

const Dashboard = () => {
  return (
    <ContainerPrincipal>
      <ContainerGrade>
        <Quadrado>
          <BarrasHorizontais />
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








