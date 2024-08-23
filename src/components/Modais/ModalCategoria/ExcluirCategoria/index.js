import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import tw from "twin.macro";
import BotaoPrincipal from "../../../BotaoPrincipal";
import BotaoVermelho from "../../../BotaoVermelho";
import { excluirCategoria, listarCategoria } from "../../../../api/categoriaAPI";
import { excluirSubcategoria, listarSubcategoria } from "../../../../api/subcategoriaAPI";
import { categoriaActions } from "../../../../redux/reducers/categoriaReducer";
import { subcategoriaActions } from "../../../../redux/reducers/subcategoriaReducer";

const SobreposicaoModal = styled.div`
  ${tw`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}
`;

const ConteudoModal = styled.div`
  ${tw`flex flex-col bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative`}
`;

const TituloModal = styled.h1`
  ${tw`text-2xl mb-4 text-center`}
`;

const Texto = styled.p`
  ${tw`text-center text-xl`}
`;

const BotaoFechar = styled.button`
  ${tw`absolute top-4 right-4 text-gray-500 hover:text-gray-700`}
`;

const BotaoContainer = styled.div`
  ${tw`flex flex-row justify-center mt-4 space-x-2`}
`;

const ExcluirCategoria = ({ aberto, fechado, categoriaId, nomeCategoriaSelecionadaClick, subcategoriaIds }) => {
  const dispatch = useDispatch();
  const [idCategoria, setIdCategoria] = useState(categoriaId);
  const [nomeCategoria, setNomeCategoria] = useState(nomeCategoriaSelecionadaClick);
  const [subcategorias, setSubcategorias] = useState(subcategoriaIds);

  useEffect(() => {
    setIdCategoria(categoriaId);
    setNomeCategoria(nomeCategoriaSelecionadaClick);
    setSubcategorias(subcategoriaIds || []);
  }, [categoriaId, nomeCategoriaSelecionadaClick, subcategoriaIds]);

  const handleSubmit = async (e) => {
    e.preventDefault();

        try {
        if(subcategorias.length > 0) {
            for (const idSubcategoria of subcategorias) {
                await excluirSubcategoria(idSubcategoria);
                dispatch(subcategoriaActions.excluirSubcategoriaReducer(idSubcategoria));
            }
        }
      
      await excluirCategoria(idCategoria);
      dispatch(categoriaActions.excluirCategoriaReducer(idCategoria));

      
      const categoriasAtualizadas = await listarCategoria();
      const subcategoriasAtualizadas = await listarSubcategoria();

      dispatch(categoriaActions.carregarCategoriasReducer(categoriasAtualizadas));
      dispatch(subcategoriaActions.carregarSubcategoriasReducer(subcategoriasAtualizadas));

      toast.success("Categoria e subcategorias excluídas com sucesso!");
      fechado();
    } catch (error) {
      toast.error("Erro ao excluir a categoria e subcategorias: " + error.message);
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
              />
            </svg>
          </BotaoFechar>
          <TituloModal>Excluir Categoria</TituloModal>
          <Texto>Deseja excluir a categoria {nomeCategoria} e suas subcategorias?</Texto>
          <BotaoContainer>
            <BotaoPrincipal onClick={handleSubmit} type="button" className="px-6 py-3 text-base font-medium">
              Sim
            </BotaoPrincipal>
            <BotaoVermelho onClick={fechado} className="px-6 py-3 text-base font-medium">
              Não
            </BotaoVermelho>
          </BotaoContainer>
        </ConteudoModal>
        <ToastContainer />
      </SobreposicaoModal>
    </>
  );
};

export default ExcluirCategoria;


