import React from "react";
import styled from "styled-components";
import tw from "twin.macro";


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
  &:hover {
    ${tw`bg-custom-dark-red`}
  }
`;

const BotaoVermelho = ({children, onClick}) => {
    return <Botao onClick={onClick}>{children}</Botao>
}

export default BotaoVermelho;