import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { adicionarNovaCategoria, listarCategoria } from "../../../../api/categoriaAPI";
import { categoriaActions } from "../../../../redux/reducers/categoriaReducer";
import BotaoPrincipal from "../../../BotaoPrincipal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SobreposicaoModal = styled.div.attrs({
  className: `fixed 
              inset-0 flex 
              items-center 
              justify-center 
              z-50 bg-black 
              bg-opacity-50`,
})``;

const ConteudoModal = styled.div.attrs({
  className: `flex 
              flex-col 
              bg-white 
              rounded-lg 
              shadow-lg 
              w-full 
              max-w-lg 
              p-6 
              relative`,
})``;

const BotaoFechar = styled.button.attrs({
  className: `absolute 
              top-4 
              right-4 
              text-gray-500 
              hover:text-gray-700`,
})``;

const Formulario = styled.form.attrs({
  className: `flex 
              flex-col 
              space-y-4`,
})``;

const TituloModal = styled.h1.attrs({
  className: `text-2xl 
              mb-4 
              text-center`,
})``;

const InputsContainer = styled.div.attrs({
  className: `flex 
              flex-col 
              space-y-4`,
})``;

const InputGroup = styled.div.attrs({
  className: `flex 
              items-center 
              space-x-4`,
})``;

const Label = styled.label.attrs({
  className: `w-32 
              text-right 
              font-medium`,
})``;

const Input = styled.input.attrs({
  className: `border-2 
              border-custom-blue 
              p-2 rounded`,
})``;


const BotaoContainer = styled.div.attrs({
  className: `flex 
              justify-center 
              mt-4`,
})``;

const AdicionarCategoria = ({ aberto, fechado }) => {
  const [novoId, setNovoId] = useState(null);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProximoCategoriaId = async () => {
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
      fetchProximoCategoriaId();
    }
  }, [aberto, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nomeCategoria.trim() === "") return;

    try {
      const novaCategoria = {
        idCategoria: novoId,
        DscTipoCategoria: nomeCategoria,
      };
      await adicionarNovaCategoria(novaCategoria);

      dispatch(categoriaActions.adicionarCategoriaReducer(novaCategoria));

      const categoriasAtualizadas = await listarCategoria();
      dispatch(
        categoriaActions.carregarCategoriasReducer(categoriasAtualizadas)
      );

      toast.success("Categoria cadastrada com sucesso!");

      setNomeCategoria("");
      fechado();
    } catch (error) {
      console.error("Erro ao adicionar uma nova categoria", error);
      toast.error("Erro ao adicionar uma nova categoria: " + error.message);
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
            <TituloModal>Inserir Categoria</TituloModal>
            <InputsContainer>
              <InputGroup>
                <Label>ID da Categoria:</Label>
                <Input
                  className="bg-gray-300"
                  type="text"
                  value={novoId || ""}
                  readOnly
                />
              </InputGroup>
              <InputGroup>
                <Label>Nome da Categoria:</Label>
                <Input
                  type="text"
                  value={nomeCategoria}
                  onChange={(e) => setNomeCategoria(e.target.value)}
                  required
                />
              </InputGroup>
              <BotaoContainer>
              <BotaoPrincipal
                type="submit"
                className="px-6 py-3 text-base font-medium"
              >
                Cadastrar
              </BotaoPrincipal>
              </BotaoContainer>
             
            </InputsContainer>
          </Formulario>
        </ConteudoModal>
      </SobreposicaoModal>
      <ToastContainer />
    </>
  );
};

export default AdicionarCategoria;
