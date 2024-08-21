import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import BotaoPrincipal from '../BotaoPrincipal';


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
            <BotaoPrincipal>Novo Registro</BotaoPrincipal>
          </ButtonsContainer>
        </InputsAndButtonsContainer>
      </InputsEBotaoContainer>
    </Container>
  );
};

export default InputsDatas;



