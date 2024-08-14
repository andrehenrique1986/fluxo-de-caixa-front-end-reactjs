import React from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs({
  className: 'fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-black'
})``;

const ModalContainer = styled.div.attrs({
  className: 'bg-white rounded-lg p-6 max-w-lg w-full shadow-lg relative w-full h-full'
})``;


const ModalRegistro = () => {
  return (
    <Container>
      <ModalContainer>
      
      </ModalContainer>
    </Container>
  );
};

export default ModalRegistro;
