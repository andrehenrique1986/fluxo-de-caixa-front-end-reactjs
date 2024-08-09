import React from "react";
import styled from "styled-components";

const Botao = styled.button.attrs({
    className: "bg-custom-blue text-white text-sm p-5 border-0 rounded-full cursor-pointer hover:bg-custom-dark-blue"
})``;

const BotaoPrincipal = (props) => {
  return <Botao>{props.children}</Botao>;
};

export default BotaoPrincipal;
