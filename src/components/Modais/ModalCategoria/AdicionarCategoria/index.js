import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  adicionarNovaCategoria,
  listarCategoria,
} from "../../../../api/categoriaAPI";
import { categoriaActions } from "../../../../redux/reducers/categoriaReducer";
import BotaoPrincipal from "../../../BotaoPrincipal";

const SobreposicaoModal = styled.div.attrs({
  className: `fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 w-full h-full`,
})``;

const ContainerFormulario = styled.div.attrs({
  className: `flex flex-col space-y-4 flex-1`,
})``;

const ConteudoModal = styled.div.attrs({
  className: `bg-white rounded-lg shadow-lg max-w-full sm:max-w-4xl w-full max-h-full overflow-auto relative p-6 text-black`,
})``;

const BotaoFechar = styled.button.attrs({
  className: `absolute top-4 right-4 text-gray-500 hover:text-gray-700`,
})``;

const Formulario = styled.form.attrs({
  className: `flex flex-col space-y-4`,
})``;

const TituloModal = styled.h1.attrs({
  className: `text-2xl mb-4 text-center`,
})``;

const Input = styled.input.attrs({
  className: `flex flex-1 border p-2 rounded`,
})``;

const InputsContainer = styled.div.attrs({
  className: `flex items-center space-x-4`,
})``;

const InputGroup = styled.div.attrs({
  className: `flex flex-col space-y-2`,
})``;

const Label = styled.span.attrs({})``;

const Notificacao = styled.div.attrs({
  className: `fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg`,
})``;

const AdicionarCategoria = ({ aberto, fechado }) => {
  const [novoId, setNovoId] = useState(null);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProximoId = async () => {
      try {
        const categorias = await listarCategoria();
        const ultimoId = categorias.reduce(
          (maxId, categoria) => Math.max(maxId, categoria.id),
          0
        );
        setNovoId(ultimoId + 1);
      } catch (error) {
        console.error("Erro ao obter categorias", error);
        dispatch(
          categoriaActions.erroCategoriaReducer(
            "Erro ao obter categorias: " + error.message
          )
        );
      }
    };

    if (aberto) {
      fetchProximoId();
    }
  }, [aberto, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nomeCategoria.trim() === "") return;

    try {
      const novaCategoria = { idCategoria: novoId, DscTipoCategoria: nomeCategoria };
      console.log("Nova categoria: ", novaCategoria);
      await adicionarNovaCategoria(novaCategoria);
      dispatch(categoriaActions.adicionarCategoriaReducer(novaCategoria));
      setNomeCategoria(""); // Limpar o campo de input
      setMensagemSucesso("Categoria cadastrada com sucesso!");
      setTimeout(() => {
        setMensagemSucesso(""); // Ocultar a mensagem após 3 segundos
      }, 3000);
      fechado(); // Fechar o modal
    } catch (error) {
      console.error("Erro ao adicionar uma nova categoria", error);
      dispatch(categoriaActions.atualizarCategoriaReducer('Erro ao adicionar uma nova categoria', error.message));
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
          <Formulario onSubmit={handleSubmit} method="post">
            <ContainerFormulario>
              <TituloModal>Inserir Categoria</TituloModal>
              <InputsContainer>
                <InputGroup>
                  <Label>ID</Label>
                  <Input
                    className="bg-gray-300"
                    type="text"
                    value={novoId}
                    readOnly
                    onChange={(e) => setNovoId(e.target.value)}
                  />
                </InputGroup>
                <InputGroup className="flex-1">
                  <Label>Categoria</Label>
                  <Input
                    type="text"
                    value={nomeCategoria}
                    onChange={(e) => setNomeCategoria(e.target.value)}
                    placeholder="Nome da Categoria"
                    required
                  />
                </InputGroup>
              </InputsContainer>
              <BotaoPrincipal
                type="submit"
                className="px-6 py-3 text-base font-medium"
                
              >
                Cadastrar
              </BotaoPrincipal>
            </ContainerFormulario>
          </Formulario>
        </ConteudoModal>
      </SobreposicaoModal>
      {mensagemSucesso && (
        <Notificacao>{mensagemSucesso}</Notificacao>
      )}
    </>
  );
};

export default AdicionarCategoria;



