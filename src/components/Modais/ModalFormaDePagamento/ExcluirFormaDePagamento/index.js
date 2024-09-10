import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import BotaoVermelho from "../../../BotaoVermelho";
import BotaoPrincipal from "../../../BotaoPrincipal";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { excluirFormaDePagamento, listarFormaDePagamento } from "../../../../api/formaDePagamentoAPI";
import { formaDePagamentoActions } from "../../../../redux/reducers/formaDePagamentoReducer";

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

const TituloModal = styled.h1`
  ${tw`text-2xl 
       mb-4 
       text-center`}
`;

const Texto = styled.p`
    ${tw`items-center 
         text-center
         text-xl
         `}
`;

const BotaoContainer = styled.div`
  ${tw`flex 
       flex-row
       justify-center 
       mt-4
       space-x-2`
       }
`;

const ExcluirFormaDePagamento = ({ aberto, fechado, formaDePagamentoId, formaDePagamentoSelecionadaClick }) => {
  
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

      const formaDePagamentoExcluida = {
        idFormaDePagamento,
        tipoFormaDePagamento,
      };

      await excluirFormaDePagamento(formaDePagamentoExcluida);

      dispatch(formaDePagamentoActions.excluirFormaDePagamentoReducer(formaDePagamentoExcluida));

      const formasDePagamentoAtualizadas = await listarFormaDePagamento();

      dispatch(formaDePagamentoActions.carregarFormaDePagamentoReducer(formasDePagamentoAtualizadas));

      toast.success("Forma de Pagamento excluída com sucesso!");
      fechado();

    } catch (error) {
      toast.error("Erro ao excluir a forma de pagamento: " + error.message);
    }

  }

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
          <TituloModal>Excluir Forma de Pagamento</TituloModal>
                    <Texto>Deseja excluir esta forma de pagamento ?</Texto>
                    <BotaoContainer >
                    <BotaoPrincipal 
                    onClick={handleSubmit}
                    type="submit"
                    className="px-6 py-3 text-base font-medium" 
                    >
                    Sim
                    </BotaoPrincipal>
                    <BotaoVermelho 
                    onClick={fechado}
                    className="px-6 py-3 text-base font-medium"
                    >
                    Não
                    </BotaoVermelho>
                    </BotaoContainer>
        </ConteudoModal>
      </SobreposicaoModal>
      <ToastContainer/>
    </>
  );
};

export default ExcluirFormaDePagamento;