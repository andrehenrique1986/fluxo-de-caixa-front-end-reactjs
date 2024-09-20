import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

// Botão com estilos responsivos
const Botao = styled.button`
  ${tw`bg-custom-blue 
       text-white 
       text-xs  // Tamanho padrão para celulares
       py-2 
       px-4 
       border-none 
       rounded-full 
       cursor-pointer 
       flex 
       justify-center 
       mt-2`} // Reduzir o margin-top em telas pequenas

  // Estilos para tablets
  @media (min-width: 768px) {
    ${tw`text-sm 
         py-3 
         px-6`} // Ajustar padding e tamanho da fonte para tablets
  }
  
  // Estilos para telas grandes
  @media (min-width: 1024px) {
    ${tw`text-base 
         py-4 
         px-8`} // Ajustar padding e tamanho da fonte para telas grandes
  }

  &:hover {
    ${tw`bg-custom-dark-blue`}
  }
`;

const BotaoPrincipal = ({ children, onClick }) => {
  return <Botao onClick={onClick}>{children}</Botao>;
};

export default BotaoPrincipal;



