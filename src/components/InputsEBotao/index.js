import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import InputsDatas from "../InputsDatas";
import { ToastContainer } from "react-toastify";


// Container principal
const Container = styled.div`
  ${tw`flex 
       flex-col  
       bg-[#e1edd6] 
       text-black 
       py-4 
       px-6 
       rounded-md 
       text-base 
       cursor-pointer 
       mt-2 
       w-full`
       }
  
    ${tw`sm:w-full`} 
  
`;

// Container dos inputs
const DivInputs = styled.div`
  ${tw`flex-1 
       flex-col`
       }
`;

const InputsEBotao = ({ dataInicial, dataFinal, onChange }) => {
  return (
    <Container>
      <DivInputs>
        <InputsDatas dataInicial={dataInicial} dataFinal={dataFinal} onChange={onChange} />
      </DivInputs>
      <ToastContainer/>
    </Container>
  );
};

export default InputsEBotao;

