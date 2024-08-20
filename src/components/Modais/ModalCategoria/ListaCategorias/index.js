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
       h-auto`
       }
`;

const TituloModal = styled.h1`
    ${tw`text-2xl 
    mb-4 
    text-center`
    }
  `;

const Lista = styled.ul`
    ${tw`list-none 
        p-0 
        m-0 
        text-black
        border-2 
        border-custom-blue 
        overflow-y-auto`
        }
    max-height: 300px;
  `;


const DivErro = styled.div`
  ${tw`text-red-600 
       font-bold
       `
       }
`;

const ContainerLista = styled.div`
  ${tw`flex 
       w-full 
       justify-between 
       space-x-1 
       bg-blue-200 
       border-2 
       border-custom-blue`
       }
`;


const Item = styled.li`
  ${tw`py-2 
       px-4 
       cursor-pointer 
       border-0`
       }
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
       flex-col 
       border 
       border-blue-500`
       }
`;

const TituloLista = styled.h2`
  ${tw`text-center 
       text-lg 
       font-bold 
       mb-2`
       }
`;

// Container para Botões
const BotaoContainer = styled.div`
  ${tw`flex w-full justify-center space-x-4`}
`;


const ListaCategorias = () => {
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categorias.categorias);
  const subcategorias = useSelector(state => state.subcategorias.subcategorias);
  const erroCategoria = useSelector((state) => state.categorias.error);
  const erroSubcategoria = useSelector((state) => state.subcategorias.error);

  const [nomeCategoriaSelecionadaClick, setNomeCategoriaSelecionadaClick] = useState(null);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [subCategoriaSelecionada, setSubCategoriaSelecionada] = useState(null);
  const [modalAdicionarCategoria, setModalAdicionarCategoria] = useState(false);
  const [modalAdicionarSubcategoria, setModalAdicionarSubcategoria] = useState(false);

  const abrirAdicionarCategoria = () => setModalAdicionarCategoria(true);
  const fecharAdicionarCategoria = () => setModalAdicionarCategoria(false);

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
        dispatch(
          categoriaActions.erroCategoriaReducer(
            "Erro ao carregar categorias: " + erro.message
          )
        );
      }
    };

    const fetchSubcategorias = async () => {
      try {
        const data = await listarSubcategoria();
        dispatch(subcategoriaActions.carregarSubcategoriasReducer(data));
      } catch (erro) {
        console.error("Erro ao carregar subcategorias:", erro);
        dispatch(
          subcategoriaActions.erroSubcategoriaReducer(
            "Erro ao carregar subcategorias: " + erro.message
          )
        );
      }
    };

    setCategoriaSelecionada(categorias.categoriaSelecionada);

    fetchCategorias();
    fetchSubcategorias();
  }, [dispatch]);

  const handleSuccessCategoria = (novaCategoria) => {
    toast.success('Categoria cadastrada com sucesso!');
    dispatch(categoriaActions.adicionarCategoriaReducer(novaCategoria));
    setModalAdicionarCategoria(false);
  };

  const handleErrorCategoria = (erro) => {
    toast.error('Erro ao cadastrar categoria: ' + erro.message);
  };

  const handleSuccessSubcategoria = (novaSubcategoria) => {
    toast.success('Subcategoria cadastrada com sucesso!');
    dispatch(subcategoriaActions.adicionarSubategoriaReducer(novaSubcategoria));
    // Recarregar a lista de subcategorias
    const fetchSubcategorias = async () => {
      try {
        const data = await listarSubcategoria();
        dispatch(subcategoriaActions.carregarSubcategoriasReducer(data));
      } catch (erro) {
        console.error("Erro ao carregar subcategorias:", erro);
        dispatch(
          subcategoriaActions.erroSubcategoriaReducer(
            "Erro ao carregar subcategorias: " + erro.message
          )
        );
      }
    };
    fetchSubcategorias();
    setModalAdicionarSubcategoria(false);
  };

  const handleErrorSubcategoria = (erro) => {
    toast.error('Erro ao cadastrar subcategoria: ' + erro.message);
  };

  const handleSemCategoria = () => {
    toast('Selecione uma categoria');
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
                    setNomeCategoriaSelecionadaClick(categoria.nomeDaCategoria)
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
      <BotaoContainer>
        <BotaoPrincipal 
          onClick={abrirAdicionarCategoria} 
          className="w-1/2"
        >
          Adicionar Categoria
        </BotaoPrincipal>
        <AdicionarCategoria
          aberto={modalAdicionarCategoria}
          fechado={fecharAdicionarCategoria}
          onSuccess={handleSuccessCategoria}
          onError={handleErrorCategoria}
        />
        <BotaoPrincipal 
          onClick={abrirAdicionarSubcategoria} 
          className="w-1/2"
        >
          Adicionar Sub Categoria
        </BotaoPrincipal>
        <AdicionarSubcategoria 
          aberto={modalAdicionarSubcategoria}
          fechado={fecharAdicionarSubcategoria}
          onSuccess={handleSuccessSubcategoria}
          onError={handleErrorSubcategoria}
        />
      </BotaoContainer>
      <ToastContainer />
    </Container>
  );
};

export default ListaCategorias;





