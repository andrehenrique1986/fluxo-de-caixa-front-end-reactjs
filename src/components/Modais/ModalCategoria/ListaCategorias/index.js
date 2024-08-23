import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoriaActions } from "../../../../redux/reducers/categoriaReducer";
import { subcategoriaActions } from "../../../../redux/reducers/subcategoriaReducer";
import { listarCategoria } from "../../../../api/categoriaAPI";
import { listarSubcategoria } from "../../../../api/subcategoriaAPI";
import styled from "styled-components";
import tw from "twin.macro";
import BotaoPrincipal from "../../../BotaoPrincipal";
import AdicionarCategoria from "../AdicionarCategoria";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdicionarSubcategoria from "../../ModalSubcategoria/AdicionarSubcategoria/index.js";
import AtualizarCategoria from "../AtualizarCategoria/index.js";
import ExcluirCategoria from "../ExcluirCategoria/index.js";
import AtualizarSubcategoria from "../../ModalSubcategoria/AtualizarSubcategoria/index.js";
import ExcluirSubcategoria from "../../ModalSubcategoria/ExcluirSubcategoria/index.js";

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
  ${tw`list-none 
       p-0 
       m-0 
       text-black
       border-2 
       border-custom-blue 
       overflow-y-auto`}
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
       border-custom-blue`}
`;

const Item = styled.li`
  ${tw`py-2 
       px-4 
       cursor-pointer 
       border-0`}
  ${({ isSelected }) => isSelected ? 
                                  tw`bg-blue-400 
                                     text-white` 
                                  :
                                  tw`bg-gray-100 
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

const ListaCategorias = () => {
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categorias.categorias) || [];
  const subcategorias = useSelector(state => state.subcategorias.subcategorias) || [];
  const erroCategoria = useSelector(state => state.categorias.error);
  const erroSubcategoria = useSelector(state => state.subcategorias.error);

  const [nomeCategoriaSelecionadaClick, setNomeCategoriaSelecionadaClick] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [subCategoriaSelecionada, setSubCategoriaSelecionada] = useState(null);
  const [modalAdicionarCategoria, setModalAdicionarCategoria] = useState(false);
  const [modalAtualizarCategoria, setModalAtualizarCategoria] = useState(false);
  const [modalExcluirCategoria, setModalExcluirCategoria] = useState(false);
  const [modalAdicionarSubcategoria, setModalAdicionarSubcategoria] = useState(false);
  const [modalAtualizarSubcategoria, setModalAtualizarSubcategoria] = useState(false);
  const [modalExcluirSubcategoria, setModalExcluirSubcategoria] = useState(false);

  const abrirAdicionarCategoria = () => setModalAdicionarCategoria(true);
  const fecharAdicionarCategoria = () => setModalAdicionarCategoria(false);

  const abrirAtualizarCategoria = () => setModalAtualizarCategoria(true);
  const fecharAtualizarCategoria = () => setModalAtualizarCategoria(false);

  const abrirExcluirCategoria = () => setModalExcluirCategoria(true);
  const fecharExcluirCategoria = () => setModalExcluirCategoria(false);


  const abrirAtualizarSubcategoria = () => setModalAtualizarSubcategoria(true);
  const fecharAtualizarSubcategoria = () => setModalAtualizarSubcategoria(false);


  const abrirExcluirSubcategoria = () => setModalExcluirSubcategoria(true);
  const fecharExcluirSubcategoria = () => setModalExcluirSubcategoria(false);

  const abrirAdicionarSubcategoria = () => {
    if (categoriaSelecionada) {
      setModalAdicionarSubcategoria(true);
    } else {
      handleSemCategoria();
    }
  };

  const fecharAdicionarSubcategoria = () => setModalAdicionarSubcategoria(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await listarCategoria();
        dispatch(categoriaActions.carregarCategoriasReducer(data));
      } catch (erro) {
        console.error("Erro ao carregar categorias:", erro);
        dispatch(categoriaActions.erroCategoriaReducer("Erro ao carregar categorias: " + erro.message));
      }
    };

    const fetchSubcategorias = async () => {
      try {
        const data = await listarSubcategoria();
        dispatch(subcategoriaActions.carregarSubcategoriasReducer(data));
      } catch (erro) {
        console.error("Erro ao carregar subcategorias:", erro);
        dispatch(subcategoriaActions.erroSubcategoriaReducer("Erro ao carregar subcategorias: " + erro.message));
      }
    };

    fetchCategorias();
    fetchSubcategorias();
  }, [dispatch]);

  const handleSuccessNovaCategoria = (novaCategoria) => {
    toast.success('Categoria cadastrada com sucesso!');
    dispatch(categoriaActions.adicionarCategoriaReducer(novaCategoria));
    setModalAdicionarCategoria(false);
  };

  const handleSuccessAtualizarCategoria = (categoria, categoriaAtualizada) => {
    if (categoriaAtualizada) {
      dispatch(categoriaActions.atualizarCategoriaReducer(categoria));
      toast.success('Categoria atualizada com sucesso!');
    }
    setModalAtualizarCategoria(false);
  };

  const handleErrorAdicionarCategoria = (erro) => {
    toast.error('Erro ao cadastrar categoria: ' + erro.message);
  };

  const handleErrorAtualizarCategoria = (erro) => {
    toast.error('Erro ao atualizar categoria: ' + erro.message);
  };

  const handleSuccessSubcategoria = (novaSubcategoria, subcategoriaAtualizada) => {
    if(subcategoriaAtualizada){
      dispatch(subcategoriaActions.adicionarSubategoriaReducer(novaSubcategoria));
      toast.success('Subcategoria cadastrada com sucesso!');
    }
    setModalAdicionarSubcategoria(false);
  };

  const handleErrorSubcategoria = (erro) => {
    toast.error('Erro ao cadastrar subcategoria: ' + erro.message);
  };

  const handleSemCategoria = () => {
    toast.warning('Selecione uma categoria');
  };

  const handleSemSubcategoria = () => {
    toast.warning('Selecione uma subcategoria');
  };

  if (erroCategoria) return <DivErro>{erroCategoria}</DivErro>;
  if (erroSubcategoria) return <DivErro>{erroSubcategoria}</DivErro>;

  const subcategoriasFiltradas = categoriaSelecionada?.nomeDaCategoria
    ? subcategorias.filter(subcategoria => subcategoria?.nomeDaCategoria === categoriaSelecionada?.nomeDaCategoria)
    : [];

  return (
    <Container>
      <TituloModal>Lista Categorias</TituloModal>
      <ContainerLista>
        <ListaContainer>
          <TituloLista>Categorias</TituloLista>
          <Lista>
            {categorias.length > 0 ? (
              categorias.map((categoria) => (
                <Item
                  key={categoria.id}
                  isSelected={categoria?.nomeDaCategoria === nomeCategoriaSelecionadaClick}
                  onClick={() => { 
                    setCategoriaSelecionada(categoria);
                    dispatch(categoriaActions.setCategoriaSelecionadaReducer(categoria));
                    setNomeCategoriaSelecionadaClick(categoria.nomeDaCategoria);
                  }}
                >
                  {categoria.id} - {categoria.nomeDaCategoria}
                </Item>
              ))
            ) : (
              <Item>Não há categorias disponíveis.</Item>
            )}
          </Lista>
        </ListaContainer>
        <ListaContainer>
          <TituloLista>Sub Categorias</TituloLista>
          <Lista>
            {subcategoriasFiltradas.length > 0 ? (
              subcategoriasFiltradas.map((subcategoria) => (
                <Item
                  key={subcategoria.idDaSubcategoria}
                  isSelected={subcategoria?.nomeDaSubcategoria === subCategoriaSelecionada?.nomeDaSubcategoria}
                  onClick={() => setSubCategoriaSelecionada(subcategoria)}
                >
                  {subcategoria.idDaSubcategoria} - {subcategoria.nomeDaSubcategoria}
                </Item>
              ))
            ) : (
              <Item>Não há subcategorias disponíveis.</Item>
            )}
          </Lista>
        </ListaContainer>
      </ContainerLista>
      <BotaoContainerPrincipal>
        <BotaoContainer>
          <BotaoPrincipal onClick={abrirAdicionarCategoria}>
            Adicionar Categoria
          </BotaoPrincipal>
          <BotaoPrincipal onClick={() =>{
            if (categoriaSelecionada) {
              abrirAtualizarCategoria();
            } else {
              handleSemCategoria();
            }
          }}>
            Atualizar Categoria
          </BotaoPrincipal>
          <BotaoPrincipal onClick={() => {
            if (categoriaSelecionada) {
              abrirExcluirCategoria();
            } else {
              handleSemCategoria();
            } 
          }}>
            Excluir Categoria
          </BotaoPrincipal>
        </BotaoContainer>
        <BotaoContainer>
          <BotaoPrincipal onClick={abrirAdicionarSubcategoria}>
            Adicionar Sub Categoria
          </BotaoPrincipal>
          <BotaoPrincipal onClick={() => {
            if (categoriaSelecionada && subCategoriaSelecionada) {
              abrirAtualizarSubcategoria();
            } else if (!categoriaSelecionada){
              handleSemCategoria();
            } else {
              handleSemSubcategoria();
            }
          }}>
            Atualizar Sub Categoria
          </BotaoPrincipal>
          <BotaoPrincipal onClick={() => {
            if (categoriaSelecionada && subCategoriaSelecionada) {
              abrirExcluirSubcategoria();
            } else if (!categoriaSelecionada){
              handleSemCategoria();
            } else {
              handleSemSubcategoria();
            }
          }}>
            Excluir Sub Categoria
          </BotaoPrincipal>
        </BotaoContainer>
      </BotaoContainerPrincipal>
      <AdicionarCategoria
        aberto={modalAdicionarCategoria}
        fechado={fecharAdicionarCategoria}
        onSuccess={handleSuccessNovaCategoria}
        onError={handleErrorAdicionarCategoria}
        subcategoriaId={subcategoriasFiltradas?.idDaSubcategoria}
        subcategoriaFiltrada={subcategoriasFiltradas?.nomeDaSubcategoria}
      />
      <AtualizarCategoria 
        aberto={modalAtualizarCategoria}
        fechado={fecharAtualizarCategoria}
        onSuccess={handleSuccessAtualizarCategoria}
        onError={handleErrorAtualizarCategoria}
        categoriaId={categoriaSelecionada?.id}
        nomeCategoriaSelecionadaClick={categoriaSelecionada?.nomeDaCategoria}
      />
      <ExcluirCategoria 
        aberto={modalExcluirCategoria}
        fechado={fecharExcluirCategoria}
        categoriaId={categoriaSelecionada?.id}
        setNomeCategoriaSelecionadaClick={categoriaSelecionada?.nomeDaCategoria}
        subcategoriaIds={subcategoriasFiltradas.map(sub => sub.idDaSubcategoria)} 
      />
      <AdicionarSubcategoria 
        aberto={modalAdicionarSubcategoria}
        fechado={fecharAdicionarSubcategoria}
        onSuccess={handleSuccessSubcategoria}
        onError={handleErrorSubcategoria}
      />
      <AtualizarSubcategoria
        aberto={modalAtualizarSubcategoria}
        fechado={fecharAtualizarSubcategoria}
        categoriaId={categoriaSelecionada?.id}
        nomeCategoriaSelecionadaClick={categoriaSelecionada?.nomeDaCategoria}
        subcategoriaId={subCategoriaSelecionada?.idDaSubcategoria}
        subcategoriaSelecionada={subCategoriaSelecionada?.nomeDaSubcategoria}
      />
      <ExcluirSubcategoria 
        aberto={modalExcluirSubcategoria}
        fechado={fecharExcluirSubcategoria}
        categoriaId={categoriaSelecionada?.id}
        setNomeCategoriaSelecionadaClick={categoriaSelecionada?.nomeDaCategoria}
        subcategoriaId={subCategoriaSelecionada?.idDaSubcategoria}
        subcategoriaSelecionada={subCategoriaSelecionada?.nomeDaSubcategoria}
      />
      <ToastContainer />
    </Container>
  );
};

export default ListaCategorias;







