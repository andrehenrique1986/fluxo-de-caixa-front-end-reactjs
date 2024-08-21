import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import InputsDatas from "../InputsDatas";

const Container = styled.div`
  ${tw`flex 
       bg-[#e1edd6] 
       text-white 
       py-2 
       px-4 
       rounded-md 
       text-base 
       cursor-pointer 
       mt-1`
                 }
`;

const DivInputs = styled.div`
  ${tw`flex-1`}
`;


const InputsEBotao = () => {
  return (
    <Container>
      <DivInputs>
        <InputsDatas />
      </DivInputs>
    </Container>
  );
};

export default InputsEBotao;
