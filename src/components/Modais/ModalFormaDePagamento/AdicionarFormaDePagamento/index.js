import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import BotaoPrincipal from "../../../BotaoPrincipal";
import {
  adicionarFormaDePagamento,
  listarFormaDePagamento,
} from "../../../../api/formaDePagamentoAPI";
import { formaDePagamentoActions } from "../../../../redux/reducers/formaDePagamentoReducer";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

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
       rounded
       w-1/2`}
`;

const BotaoContainer = styled.div`
  ${tw`flex 
       justify-center 
       mt-4`}
`;

const AdicionarFormaDePagamento = ({ aberto, fechado }) => {
  const dispatch = useDispatch();
  const [novoId, setNovoId] = useState(null);
  const [nomeFormaDePagamento, setNomeFormaDePagamento] = useState("");

  useEffect(() => {
    const fetchFormasDePagamento = async () => {
      try {
        const data = await listarFormaDePagamento();
        dispatch(formaDePagamentoActions.carregarFormaDePagamentoReducer(data));
      } catch (erro) {
        console.error("Erro ao carregar as formas de pagamento:", erro);
        dispatch(
          formaDePagamentoActions.erroFormaDePagamentoReducer(
            "Erro ao carregar as formas de pagamento: " + erro.message
          )
        );
      }
    };

    fetchFormasDePagamento();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nomeFormaDePagamento.trim()) {
      toast.error("O nome da forma de pagamento é obrigatório.");
      return;
    }

    try {
      const novaFormaDePagamento = {
        IdFormaDePagamento: novoId,
        tipoFormaDePagamento: nomeFormaDePagamento,
      };

      await adicionarFormaDePagamento(novaFormaDePagamento);
      dispatch(formaDePagamentoActions.adicionarFormaDePagamentoReducer(novaFormaDePagamento));

      const formasDePagamentoAtualizada = await listarFormaDePagamento();
      dispatch(formaDePagamentoActions.carregarFormaDePagamentoReducer(formasDePagamentoAtualizada));
      toast.success("Forma de Pagamento cadastrada com sucesso!");
      setNomeFormaDePagamento("");
      fechado();
    } catch (error) {
      toast.error("Erro ao cadastrar uma forma de pagamento: " + error.message);
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
            <TituloModal>Inserir Forma de Pagamento</TituloModal>
            <InputsContainer>
              <InputGroup>
                <Label>Nome da Forma de Pagamento: </Label>
                <Input
                  placeholder="Nome da Forma de Pagamento"
                  type="text"
                  value={nomeFormaDePagamento}
                  onChange={(e) => setNomeFormaDePagamento(e.target.value)}
                />
              </InputGroup>
            </InputsContainer>
            <BotaoContainer>
              <BotaoPrincipal
                type="submit"
                className="px-6 py-3 text-base font-medium"
              >
                Cadastrar
              </BotaoPrincipal>
            </BotaoContainer>
          </Formulario>
        </ConteudoModal>
      </SobreposicaoModal>
      <ToastContainer /> 
    </>
  );
};

export default AdicionarFormaDePagamento;

