import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { formaDePagamentoActions } from "../../../../redux/reducers/formaDePagamentoReducer";
import BotaoPrincipal from "../../../BotaoPrincipal";
import AdicionarFormaDePagamento from "../AdicionarFormaDePagamento";
import AtualizarFormaDePagamento from "../AtualizarFormaDePagamento";
import ExcluirFormaDePagamento from "../ExcluirFormaDePagamento";
import { toast, ToastContainer } from "react-toastify";
import { listarFormaDePagamento } from "../../../../api/formaDePagamentoAPI";

const Container = styled.div`
  ${tw`flex 
       flex-col 
       p-0 
       bg-white 
       rounded-lg 
       shadow-md 
       items-center 
       text-black 
       w-96 
       h-auto`}
`;

const TituloModal = styled.h1`
  ${tw`text-2xl 
       mb-4 
       text-center`}
`;

const Lista = styled.ul`
  ${tw`list-none p-0 m-0 text-black border-2 border-custom-blue overflow-y-auto mx-auto`}
  max-height: 300px;
`;

const DivErro = styled.div`
  ${tw`text-red-600 
       font-bold`}
`;

const ContainerLista = styled.div`
  ${tw`flex 
       w-full 
       justify-between 
       space-x-1 
       bg-blue-200 
       border-2 
       border-custom-blue
       flex 
       flex-col 
       justify-center 
       items-center`}
`;

const Item = styled.li`
  ${tw`py-2 
       px-4 
       cursor-pointer 
       border-0`}
  ${({ isSelected }) =>
    isSelected
      ? tw`bg-blue-400 
                                     text-white`
      : tw`bg-gray-100 
                                     hover:bg-blue-400 
                                     hover:text-white`}
  ${({ isSelected }) => !isSelected && tw`text-black`}
`;

const ListaContainer = styled.div`
  ${tw`w-1/2 
       p-4 
       flex 
       flex-col`}
`;

const TituloLista = styled.h2`
  ${tw`text-center 
       text-lg 
       font-bold 
       mb-2`}
`;

const BotaoContainerPrincipal = styled.div`
  ${tw`flex 
       flex-row 
       space-y-0 
       space-x-10
       w-full 
       p-4`}
`;

const BotaoContainer = styled.div`
  ${tw`flex 
       flex-col 
       space-y-2`}
`;

const ListaFormaDePagamento = () => {
  const dispatch = useDispatch();
  const formasDePagamento =
    useSelector((state) => state.formasDePagamento.formasDePagamento) || [];
  const erroFormaDePagamento = useSelector(
    (state) => state.formasDePagamento.error
  );

  
  const [
    formaDePagamentoSelecionadaClick,
    setFormaDePagamentoSelecionadaClick,
  ] = useState(null);

  const [modalAdicionarFormaDePagamento, setModalAdicionarFormaDePagamento] =
    useState(false);
  const [modalAtualizarFormaDePagamento, setModalAtualizarFormaDePagamento] =
    useState(false);
  const [modalExcluirFormaDePagamento, setModalExcluirFormaDePagamento] =
    useState(false);

  const abrirAdicionarFormaDePagamento = () =>
    setModalAdicionarFormaDePagamento(true);
  const fecharAdicionarFormaDePagamento = () =>
    setModalAdicionarFormaDePagamento(false);

  const abrirAtualizarFormaDePagamento = () =>
    setModalAtualizarFormaDePagamento(true);
  const fecharAtualizarFormaDePagamento = () =>
    setModalAtualizarFormaDePagamento(false);

  const abrirExcluirFormaDePagamento = () =>
    setModalExcluirFormaDePagamento(true);
  const fecharExcluirFormaDePagamento = () =>
    setModalExcluirFormaDePagamento(false);

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

  const handleSuccessNovaFormaDePagamento = (novaFormaDePagamento) => {
    dispatch(formaDePagamentoActions.adicionarFormaDePagamentoReducer(novaFormaDePagamento));
    setModalAdicionarFormaDePagamento(false);
  };

  const handleSuccessAtualizarFormaDePagamento = (formaDePagamento, formaDePagamentoAtualizada) => {
    if (formaDePagamentoAtualizada) {
      dispatch(formaDePagamentoActions.atualizarFormaDePagamentoReducer(formaDePagamento));
      toast.success("Forma de pagamento atualizada com sucesso!");
    }
    setModalAtualizarFormaDePagamento(false);
  };

  const handleSuccessExcluirFormaDePagamento = (formaDePagamento, formaDePagamentoExcluida) => {
    if (formaDePagamentoExcluida) {
      dispatch(formaDePagamentoActions.excluirFormaDePagamentoReducer(formaDePagamento));
      toast.success("Forma de pagamento excluida com sucesso!");
    }
    setModalAtualizarFormaDePagamento(false);
  };

  const handleErrorFormaDePagamento = (erro) => {
    toast.error("Erro ao cadastrar uma forma de pagamento: " + erro.message);
  };

  const handleErrorAtualizarFormaDePagamento = (erro) => {
    toast.error("Erro ao atualizar uma forma de pagamento: " + erro.message);
  };

  const handleErrorExcluirFormaDePagamento = (erro) => {
    toast.error("Erro ao excluir uma forma de pagamento: " + erro.message);
  };

  const handleSemFormaDePagamento = () => {
    toast.warning("Selecione uma forma de pagamento");
  };

  if (erroFormaDePagamento) return <DivErro>{erroFormaDePagamento}</DivErro>;

  return (
    <Container>
      <TituloModal>Formas de Pagamento</TituloModal>
      <ContainerLista>
        <ListaContainer>
          <Lista>
            {formasDePagamento.length > 0 ? (
              formasDePagamento.map((formaDePagamento) => (
                <Item
                  key={formaDePagamento.id}
                  isSelected={
                    formaDePagamento?.id === formaDePagamentoSelecionadaClick?.id
                  }
                  onClick={() => {
                    setFormaDePagamentoSelecionadaClick(formaDePagamento);
                    dispatch(
                      formaDePagamentoActions.setFormaDePagamentoSelecionadaReducer(
                        formaDePagamento
                      )
                    );
                    setFormaDePagamentoSelecionadaClick(formaDePagamento);
                  }}
                >
                  {formaDePagamento.id} - {formaDePagamento.nome}
                </Item>
              ))
            ) : (
              <Item>Não há formas de pagamento disponíveis.</Item>
            )}
          </Lista>
        </ListaContainer>
      </ContainerLista>
      <BotaoContainer>
        <BotaoPrincipal onClick={abrirAdicionarFormaDePagamento}>
          Adicionar Forma de Pagamento
        </BotaoPrincipal>
        <BotaoPrincipal onClick={() => {
          if (formaDePagamentoSelecionadaClick) {
            abrirAtualizarFormaDePagamento();
          } else {
            handleSemFormaDePagamento();
          }
        }}>
          Atualizar Forma de Pagamento
        </BotaoPrincipal>
        <BotaoPrincipal onClick={() => {
          if (formaDePagamentoSelecionadaClick) {
            abrirExcluirFormaDePagamento();
          } else {
            handleSemFormaDePagamento();
          }
        }}>Excluir Forma de Pagamento</BotaoPrincipal>
      </BotaoContainer>
      <AdicionarFormaDePagamento
        aberto={modalAdicionarFormaDePagamento}
        fechado={fecharAdicionarFormaDePagamento}
        onSuccess={handleSuccessNovaFormaDePagamento}
        onError={handleErrorFormaDePagamento}
      />
      <AtualizarFormaDePagamento
        aberto={modalAtualizarFormaDePagamento}
        fechado={fecharAtualizarFormaDePagamento}
        onSuccess={handleSuccessAtualizarFormaDePagamento}
        onError={handleErrorAtualizarFormaDePagamento}
        formaDePagamentoId={formaDePagamentoSelecionadaClick?.id}
        formaDePagamentoSelecionadaClick={formaDePagamentoSelecionadaClick?.nome}
      />
      <ExcluirFormaDePagamento
        aberto={modalExcluirFormaDePagamento}
        fechado={fecharExcluirFormaDePagamento}
        onSuccess={handleSuccessExcluirFormaDePagamento}
        onError={handleErrorExcluirFormaDePagamento}
        formaDePagamentoId={formaDePagamentoSelecionadaClick?.id}
        formaDePagamentoSelecionadaClick={formaDePagamentoSelecionadaClick?.nome}
      />
      <ToastContainer/>
    </Container>
  );
};

export default ListaFormaDePagamento;

