import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import TituloPrincipal from "../../components/TituloPrincipal";
import InputsEBotao from "../../components/InputsEBotao";
import TabBarBotoes from "../../components/TabBarBotoes";
import Footer from "../../components/Footer";
import Painel from "../Painel/Painel.jsx";
import styled from "styled-components";
import tw from "twin.macro";
import DashBoard from "../Dashboard/Dashboard.jsx";

const Container = styled.div`
  ${tw`flex`};
  ${tw`min-h-screen`}; 
`;

const ContentContainer = styled.div`
  ${tw`flex-1`}; 
  ${tw`p-4`} 
`;

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


