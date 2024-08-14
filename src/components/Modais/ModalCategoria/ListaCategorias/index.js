import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { carregarCategorias, erroCategoria } from '../../../../redux/actions/categoriaActions';  
import { carregarSubcategorias, erroSubcategoria } from '../../../../redux/actions/subcategoriaActions';
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
                h-auto`
})``;

const TituloModal = styled.h1.attrs({
    className: `text-2xl mb-4 text-center`
})``;

const Lista = styled.ul.attrs({
    className: `list-none 
                p-0 
                m-0 
                text-black-800`
})``;

const DivErro = styled.div.attrs({
    className: `text-red-600 
                font-bold`
})``;

const ContainerLista = styled.div.attrs({
    className: `flex w-full justify-between space-x-5` 
})``;

const Item = styled.li.attrs({
    className: `py-2 
                border-b 
                border-gray-300 
                text-black
                last:border-b-0
                cursor-pointer`
})``;

const ListaContainer = styled.div.attrs({
    className: `w-1/2 p-4 flex flex-col`
})``;

const TituloLista = styled.h2.attrs({
    className: `text-center text-lg font-bold mb-2`
})``;

const BotaoContainer = styled.div.attrs({
    className: `flex w-full justify-center space-x-4 mt-4` 
})``;

// Componente principal
const ListaCategorias = () => {
    const dispatch = useDispatch();
    const categorias = useSelector(state => state.categorias.categorias); 
    const subcategorias = useSelector(state => state.subcategorias.subcategorias);
    const erroCategoria = useSelector(state => state.categorias.erroCategoria); 
    const erroSubcategoria = useSelector(state => state.subcategorias.erroSubcategoria);

    useEffect(() => {
        
        const fetchCategorias = async () => {
            try {
                const data = await listarCategoria();
                console.log('Categorias recebidas:', data); 
                dispatch(carregarCategorias(data)); 
            } catch (erro) {
                console.error('Erro ao carregar categorias:', erro);
                dispatch(erroCategoria('Erro ao carregar categorias: ' + erro.message)); 
            }
        };

        
        const fetchSubcategorias = async () => {
            try {
                const data = await listarSubcategoria();
                console.log('Subcategorias recebidas:', data); 
                dispatch(carregarSubcategorias(data)); 
            } catch (erro) {
                console.error('Erro ao carregar subcategorias:', erro);
                dispatch(erroSubcategoria('Erro ao carregar subcategorias: ' + erro.message)); 
            }
        };

        fetchCategorias();
        fetchSubcategorias();
    }, [dispatch]);

    // Renderiza erros, se houver
    if (erroCategoria) return <DivErro>{erroCategoria}</DivErro>;
    if (erroSubcategoria) return <DivErro>{erroSubcategoria}</DivErro>;

    return (
        <Container>
            <TituloModal>Lista Categorias e Subcategorias</TituloModal>
            <ContainerLista>
                <ListaContainer>
                    <TituloLista>Categorias</TituloLista>
                    <Lista>
                        {categorias.length > 0 ? (
                            categorias.map(categoria => (
                                <Item key={categoria.IdCategoria}>
                                    {categoria.DscTipoCategoria}
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
                        {subcategorias.length > 0 ? (
                            subcategorias.map(subcategoria => (
                                <Item key={subcategoria.IdSubcategoria}>
                                    {subcategoria.DscTipoSubcategoria}
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













