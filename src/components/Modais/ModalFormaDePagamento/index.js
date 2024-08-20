import React from "react";
import styled from "styled-components";
import tw from "twin.macro";


const SobreposicaoModal = styled.div`
  ${tw`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}
`;
  

const ConteudoModal = styled.div`
  ${tw`flex flex-col bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative`}
`;

const BotaoFechar = styled.button`
  ${tw`absolute top-4 right-4 text-gray-500 hover:text-gray-700`}
`;

const Formulario = styled.form`
  ${tw`flex flex-col gap-4`}
`;


const TituloModal = styled.h1`
  ${tw`text-2xl mb-4 text-center`}
`;

const InputsContainer = styled.div`
  ${tw`flex flex-col gap-4`}
`;

const InputGroup = styled.div`
  ${tw`flex items-center gap-4`}
`;


const Label = styled.label`
  ${tw`w-32 font-medium text-right`}
`;

const Input = styled.input.attrs(props => ({
  readOnly: props.readOnly
}))`
  ${tw`border-2 border-blue-500 p-2 rounded-md`}
  background-color: ${props => (props.readOnly ? '#f3f4f6' : 'white')};
`;

const BotaoContainer = styled.div`
  ${tw`flex justify-center mt-4`}
`;

const ModalFormaDePagamento = ({ fechado }) => {
    return(
        <>
      <SobreposicaoModal>
        <ConteudoModal>
          <BotaoFechar onClick={fechado}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </BotaoFechar>
          </ConteudoModal>
          </SobreposicaoModal>
        </>
    )
}

export default ModalFormaDePagamento;