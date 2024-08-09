import React from "react";
import styled from "styled-components";

const Cabacalho = styled.header.attrs({
    className: "bg-center bg-[#80ae51] p-3.5 text-center"
})``;

const TextoPrincipal = styled.h1.attrs({
    className: "text-white text-5xl font-bold"  
})``;

const Header = () => {
  return (
    <Cabacalho>
      <TextoPrincipal>Fluxo de Caixa</TextoPrincipal>
    </Cabacalho>
  );
};

export default Header;
