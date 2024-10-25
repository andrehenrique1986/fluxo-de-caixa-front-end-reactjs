import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import TituloPrincipal from "../../components/TituloPrincipal";
import InputsEBotao from "../../components/InputsEBotao";
import TabBarBotoes from "../../components/TabBarBotoes";
import Footer from "../../components/Footer";
import Painel from "../Painel/Painel.jsx";
import styled from "styled-components";
import tw from "twin.macro";
import DashBoard from "../Dashboard/Dashboard.jsx";


// Container principal com flex e ajuste de altura mínima
const Container = styled.div`
  ${tw`flex`};
  ${tw`min-h-screen`}; 

  @media (max-width: 768px) {
    ${tw`flex-col`}; /* Empilha os itens verticalmente em telas menores */
  }
`;

// Container para o conteúdo principal
const ContentContainer = styled.div`
  ${tw`flex-1`}; 
  ${tw`p-4`} 

  @media (max-width: 768px) {
    ${tw`p-2`}; /* Reduz o padding em telas menores */
  }
`;

// Componente principal
const PaginaPrincipal = () => {

  const location = useLocation();

  return (
    <>
      <Header />
      <TituloPrincipal/>
      {location.pathname !== '/dashboard' && <InputsEBotao />}

      <Container>
        <TabBarBotoes />
        <ContentContainer>
          <Routes>
            <Route path="/painelPrincipal" element={<Painel />} />
            <Route path="/dashboard" element={<DashBoard/>}/>
          </Routes>
        </ContentContainer>
      </Container>
      <Footer />
    </>
  );
};

export default PaginaPrincipal;



