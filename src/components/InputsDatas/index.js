import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import BotaoPrincipal from '../BotaoPrincipal';
import AdicionarRegistro from '../Modais/ModalRegistro/AdicionarRegistro';


const Container = styled.div`
  ${tw`flex 
       flex-col 
       gap-4 
       mt-1 
       p-4`
       }
  ${tw`md:gap-6 
       md:flex-row 
       md:items-start`
       }
`;

const InputsEBotaoContainer = styled.div`
  ${tw`flex 
       flex-col 
       gap-4 
       w-full`
       }
  ${tw`md:flex-row 
       md:gap-6 md:w-full`
       }
`;

const InputsAndButtonsContainer = styled.div`
  ${tw`flex 
       flex-col 
       md:flex-row 
       items-center 
       gap-4 
       md:gap-6 w-full`
       }
`;

const Texto = styled.span`
  ${tw`text-black 
       font-bold`
       }
  ${tw`md:text-base`}
`;

const InputData = styled.input`
  ${tw`text-black 
       p-2 
       border-gray-300 
       border 
       rounded 
       w-full`
       }
  ${tw`sm:w-auto`}
  ${tw`md:w-48`} 
`;

const ButtonsContainer = styled.div`
  ${tw`flex 
       gap-4 
       items-center`
       }
  ${tw`md:ml-4`}
`;

const InputsDatas = () => {

  const [modalAdicionarRegistro, setModalAdicionarRegistro] = useState(false);

   const abrirModalAdicionarRegistro = () => setModalAdicionarRegistro(true);
   const fecharModalAdicionarRegistro = () => setModalAdicionarRegistro(false);

  return (
    <Container>
      <InputsEBotaoContainer>
        <InputsAndButtonsContainer>
          <Texto>Data Inicial:</Texto>
          <InputData type="date" />
          <Texto>Data Final:</Texto>
          <InputData type="date" />
          <ButtonsContainer>
            <BotaoPrincipal>Buscar</BotaoPrincipal>
            <BotaoPrincipal onClick={abrirModalAdicionarRegistro}>Novo Registro</BotaoPrincipal>
            <AdicionarRegistro 
            aberto={modalAdicionarRegistro}
            fechado={fecharModalAdicionarRegistro} 
            />
          </ButtonsContainer>
        </InputsAndButtonsContainer>
      </InputsEBotaoContainer>
    </Container>
  );
};

export default InputsDatas;



