import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoriaActions } from '../../../../redux/reducers/categoriaReducer';
import { subcategoriaActions } from '../../../../redux/reducers/subcategoriaReducer';
import { listarCategoria } from '../../../../api/categoriaAPI'; 
import { listarSubcategoria } from '../../../../api/subcategoriaAPI';
import styled from 'styled-components';
import BotaoPrincipal from '../../../BotaoPrincipal';

const Container = styled.div.attrs({
    className: `flex 
                flex-col 
                p-4 
                bg-white 
                rounded-lg 
                shadow-md
                items-center
                text-black
                w-96
                h-auto
                `
})``;

const TituloModal = styled.h1.attrs({
    className: `text-2xl mb-4 text-center`
})``;

const Lista = styled.ul.attrs({
    className: `
    l           ist-none 
                p-0 
                m-0 
                text-black-800`
})``;

const DivErro = styled.div.attrs({
    className: `text-red-600 
                font-bold`
})``;

const ContainerLista = styled.div.attrs({
    className: `flex w-full justify-between space-x-5 bg-blue-200 ` 
})``;

const Item = styled.li.attrs({
    className: `py-2 
                px-4 
                bg-gray-100 
                hover:bg-blue-400
                hover:text-white
                cursor-pointer border-0`
})`
    background-color: ${props => props.isSelected ? '#1D4ED8' : '#F3F4F6'};
    color: ${props => props.isSelected ? '#FFFFFF' : '#000000'};
`;

const ListaContainer = styled.div.attrs({
    className: `w-1/2 p-4 flex flex-col`
})``;

const TituloLista = styled.h2.attrs({
    className: `text-center text-lg font-bold mb-2`
})``;

const BotaoContainer = styled.div.attrs({
    className: `flex w-full justify-center space-x-4 mt-4` 
})``;

const ListaCategorias = () => {
    const dispatch = useDispatch();
    const categorias = useSelector(state => state.categorias.categorias); 
    const subcategorias = useSelector(state => state.categorias.subcategorias);
    const erroCategoria = useSelector(state => state.categorias.error); 
    const erroSubcategoria = useSelector(state => state.subcategorias.error);

    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await listarCategoria();
                dispatch(categoriaActions.carregarCategorias(data));
            } catch (erro) {
                console.error('Erro ao carregar categorias:', erro);
                dispatch(categoriaActions.erroCategoria('Erro ao carregar categorias: ' + erro.message));
            }
        };

        const fetchSubcategorias = async () => {
            try {
                const data = await listarSubcategoria();
                dispatch(categoriaActions.carregarNomeSubcategorias(data)); 
            } catch (erro) {
                console.error('Erro ao carregar subcategorias:', erro);
                dispatch(categoriaActions.erroCategoria('Erro ao carregar subcategorias: ' + erro.message)); 
            }
        };

        fetchCategorias();
        fetchSubcategorias();
    }, [dispatch]);

    if (erroCategoria) return <DivErro>{erroCategoria}</DivErro>;
    if (erroSubcategoria) return <DivErro>{erroSubcategoria}</DivErro>;

    const subcategoriasFiltradas = categoriaSelecionada
    ? categorias.find(categoria => categoria.id === categoriaSelecionada)?.nomeDaSubcategoria || []
    : [];

    return (
        <Container>
            <TituloModal>Lista Categorias e Subcategorias</TituloModal>
            <ContainerLista>
                <ListaContainer>
                    <TituloLista>Categorias</TituloLista>
                    <Lista>
                        {categorias.length > 0 ? (
                            categorias.map(categoria => (
                                <Item
                                    
                                    key={categoria.id}
                                    isSelected={categoria.id === categoriaSelecionada}
                                    onClick={() => setCategoriaSelecionada(categoria.id)}
                                >
                                    {categoria.nomeDaCategoria}
                                    
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
                            subcategoriasFiltradas.map(subcategoria => (
                                <Item key={subcategoria.idDaSubcategoria}>
                                    {subcategoria.nomeDaSubcategoria}
                                </Item>
                            ))
                        ) : (
                            <Item>Não há subcategorias disponíveis.</Item>
                        )}
                    </Lista>
                </ListaContainer>
            </ContainerLista>
            <BotaoContainer>
                <BotaoPrincipal className='w-1/2'>Adicionar Categoria</BotaoPrincipal>
                <BotaoPrincipal className='w-1/2'>Adicionar Sub Categoria</BotaoPrincipal>
            </BotaoContainer>
        </Container>
    );
}

export default ListaCategorias;


















