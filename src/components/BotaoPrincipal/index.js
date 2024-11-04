import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Botao = styled.button`
  ${tw`bg-custom-blue
       text-white  
       text-sm 
       py-3 
       px-6 
       border-none 
       rounded-full 
       cursor-pointer 
       flex 
       justify-center 
       mt-4
       `}
  
  ${tw`lg:text-lg 
       lg:py-5 
       lg:px-10`
       } 
       
  &:hover {
    ${tw`bg-custom-dark-blue`}
  }
`;

const BotaoPrincipal = ({ children, onClick }) => {
  return <Botao style={{ fontSize: 12 }} onClick={onClick}>{children}</Botao>;
};

export default BotaoPrincipal;



