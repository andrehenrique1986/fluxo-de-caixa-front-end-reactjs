import React from "react";
import styled from "styled-components";

const Botao = styled.button`
`;

const BotaoPrincipal = (props) => {
  return <Botao
  className="
  bg-custom-blue 
  text-white
  text-sm 
  p-5 
  border-0 
  rounded-full
  cursor-pointer 
  hover:bg-[#2c3e50]
  "
  >
  {props.children}
  </Botao>;
};

export default BotaoPrincipal;
