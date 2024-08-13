import React from "react";
import styled from "styled-components";

const Container = styled.div.attrs({
  className: `bg-[#a1c082] 
              p-3.5 
              text-center 
              mt-1`
})``;

const Texto = styled.h2.attrs({
  className: `text-center 
              text-white 
              text-2xl` 
})``;

const TituloPrincipal = () => {
  return (
    <Container>
      <Texto>Movimentação Financeira</Texto>
    </Container>
  );
};

export default TituloPrincipal;

