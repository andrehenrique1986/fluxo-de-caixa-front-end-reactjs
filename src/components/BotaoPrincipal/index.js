import React from "react";
import styled from "styled-components";

const Botao = styled.button.attrs({
  className: `bg-custom-blue 
              text-white 
              text-sm 
              py-3 
              px-6 
              border-none 
              rounded-full 
              cursor-pointer 
              hover:bg-custom-dark-blue`
})``;

const BotaoPrincipal = ({children, onClick}) => {
  return <Botao onClick={onClick}>{children}</Botao>;
};

export default BotaoPrincipal;
