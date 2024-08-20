import React from "react";
import styled from "styled-components";
import tw from "twin.macro";


const Container = styled.div`
  ${tw`fixed 
       inset-0 
       bg-black 
       bg-opacity-50 
       flex 
       justify-center 
       items-center 
       z-50`
       }

`;


const ModalContainer = styled.div`
  ${tw`bg-white 
       rounded-lg 
       p-6 max-w-lg 
       w-full 
       shadow-lg 
       relative`}
`;

const ModalRegistro = () => {
  return (
    <Container>
      <ModalContainer>
        
      </ModalContainer>
    </Container>
  );
};

export default ModalRegistro;

