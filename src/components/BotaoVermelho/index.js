import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

// Botão vermelho com estilos responsivos
const Botao = styled.button`
  ${tw`bg-custom-red 
       text-white 
       text-sm 
       py-3 
       px-6 
       border-none 
       rounded-full 
       cursor-pointer 
       flex 
       justify-center 
       mt-4`}

  // Estilos responsivos
  ${tw`md:text-base md:py-4 md:px-8`} // Aumenta o tamanho da fonte e o padding em telas médias
  ${tw`lg:text-lg lg:py-5 lg:px-10`}   // Aumenta ainda mais em telas grandes

  &:hover {
    ${tw`bg-custom-dark-red`}
  }
`;

const BotaoVermelho = ({ children, onClick }) => {
  return <Botao onClick={onClick}>{children}</Botao>;
}

export default BotaoVermelho;
