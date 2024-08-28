import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import tw from "twin.macro";
import BotaoPrincipal from "../../../BotaoPrincipal";
import { atualizarFormaDePagamento, listarFormaDePagamento } from "../../../../api/formaDePagamentoAPI";
import { formaDePagamentoActions } from "../../../../redux/reducers/formaDePagamentoReducer";

// Styled Components
const SobreposicaoModal = styled.div`
  ${tw`fixed 
       inset-0 
       flex 
       items-center 
       justify-center 
       z-50 
       bg-black 
       bg-opacity-50`}
`;

const ConteudoModal = styled.div`
  ${tw`flex 
       flex-col 
       bg-white 
       rounded-lg 
       shadow-lg 
       w-full 
       max-w-lg 
       p-6 
       relative`}
`;

const BotaoFechar = styled.button`
  ${tw`absolute 
       top-4 
       right-4 
       text-gray-500 
       hover:text-gray-700`}
`;

const Formulario = styled.form`
  ${tw`flex 
       flex-col 
       space-y-4`}
`;

const TituloModal = styled.h1`
  ${tw`text-2xl 
       mb-4 
       text-center`}
`;

const InputsContainer = styled.div`
  ${tw`flex 
       flex-col 
       space-y-4`}
`;

const InputGroup = styled.div`
  ${tw`flex 
       items-center 
       space-x-4`}
`;

const Label = styled.label`
  ${tw`w-32 
       text-right 
       font-medium`}
`;

const Input = styled.input`
  ${tw`border-2 
       border-custom-blue 
       p-2 
       rounded`}
`;

const BotaoContainer = styled.div`
  ${tw`flex 
       justify-center 
       mt-4`}
`;


const AtualizarFormaDePagamento = ({ aberto, fechado, formaDePagamentoId, formaDePagamentoSelecionadaClick }) => {
  const dispatch = useDispatch();
  const [idFormaDePagamento, setIdFormaDePagamento] = useState(formaDePagamentoId);
  const [tipoFormaDePagamento, setTipoFormaDePagamento] = useState(formaDePagamentoSelecionadaClick);

  useEffect(() => {
    setIdFormaDePagamento(formaDePagamentoId);
    setTipoFormaDePagamento(formaDePagamentoSelecionadaClick);
  }, [formaDePagamentoId ,formaDePagamentoSelecionadaClick]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tipoFormaDePagamento.trim()) {
      toast.error("O nome da forma de pagamento é obrigatório.");
      return;
    }

    try {
      

      const formaDePagamentoAtual = {
        idFormaDePagamento,
        tipoFormaDePagamento,
      };

      await atualizarFormaDePagamento(formaDePagamentoAtual);

      dispatch(formaDePagamentoActions.atualizarFormaDePagamentoReducer(formaDePagamentoAtual));

      const formasDePagamentoAtualizadas = await listarFormaDePagamento();

      dispatch(formaDePagamentoActions.carregarFormaDePagamentoReducer(formasDePagamentoAtualizadas));

      toast.success("Forma de Pagamento atualizada com sucesso!");
      setTipoFormaDePagamento("");
      fechado();
    } catch (error) {
      toast.error("Erro ao atualizar a forma de pagamento: " + error.message);
    }
  };

  if (!aberto) return null;

  return (
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
          <Formulario onSubmit={handleSubmit}>
            <TituloModal>Atualizar Forma de Pagamento</TituloModal>
            <InputsContainer>
              <InputGroup>
                <Label>ID da Forma de Pagamento:</Label>
                <Input 
                  readOnly
                  className="bg-gray-300"
                  value={idFormaDePagamento} 
                />
              </InputGroup>
              <InputGroup>
                <Label>Nome da Forma de Pagamento:</Label>
                <Input 
                  type="text"
                  value={tipoFormaDePagamento}
                  onChange={(e) => setTipoFormaDePagamento(e.target.value)}
                />
              </InputGroup>
            </InputsContainer>
            <BotaoContainer>
              <BotaoPrincipal
                type="submit"
                className="px-6 py-3 text-base font-medium"
              >
                Atualizar
              </BotaoPrincipal>
            </BotaoContainer>
          </Formulario>
        </ConteudoModal>
      </SobreposicaoModal>
      <ToastContainer />
    </>
  );
};

export default AtualizarFormaDePagamento;





