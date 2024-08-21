import React, { useState, useEffect } from "react";
import { atualizarCategoria, listarCategoria } from "../../../../api/categoriaAPI";
import { categoriaActions } from "../../../../redux/reducers/categoriaReducer";
import styled from "styled-components";
import tw from "twin.macro";
import BotaoPrincipal from "../../../BotaoPrincipal";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { listarSubcategoria } from "../../../../api/subcategoriaAPI";
import { subcategoriaActions } from "../../../../redux/reducers/subcategoriaReducer";

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
         text-center`
         }
`;

const InputsContainer = styled.div`
    ${tw`flex 
         flex-col 
         space-y-4`
         }
`;

const InputGroup = styled.div`
    ${tw`flex 
         items-center 
         space-x-4`
         }
`;

const Label = styled.label`
    ${tw`w-32 
         text-right 
         font-medium`
         }
`;


const Input = styled.input`
  ${tw`border-2 
       border-custom-blue 
       p-2 
       rounded`}
`;

const BotaoContainer = styled.div`
    ${tw`flex 
         justify-center 
         mt-4`
         }
`;
 

const AtualizarCategoria = ({ aberto, fechado, categoriaId, nomeCategoriaSelecionadaClick }) => {
    const dispatch = useDispatch();
    const [idCategoria, setIdCategoria] = useState(categoriaId);
    const [nomeCategoria, setNomeCategoria] = useState(nomeCategoriaSelecionadaClick);

    useEffect(() => {
        setIdCategoria(categoriaId);
        setNomeCategoria(nomeCategoriaSelecionadaClick);
    }, [categoriaId, nomeCategoriaSelecionadaClick]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nomeCategoria.trim()) {
            toast.error("O nome da categoria é obrigatório.");
            return;
        }

        try {
            const categoriaAtualizada = {
                idCategoria, 
                DscTipoCategoria: nomeCategoria, 
            };

            await atualizarCategoria(categoriaAtualizada);

            dispatch(categoriaActions.atualizarCategoriaReducer(categoriaAtualizada));

            const categoriasAtualizadas = await listarCategoria();
            const subcategoriasAtualizadas = await listarSubcategoria();

            dispatch(categoriaActions.carregarCategoriasReducer(categoriasAtualizadas));
            dispatch(subcategoriaActions.carregarSubcategoriasReducer(subcategoriasAtualizadas));
            toast.success("Categoria atualizada com sucesso!");
            setNomeCategoria("");
            fechado();

        } catch (error) {
            toast.error("Erro ao atualizar a categoria: " + error.message);
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
                        <TituloModal>Atualizar Categoria</TituloModal>
                        <InputsContainer>
                            <InputGroup>
                                <Label>ID da Categoria:</Label>
                                <Input
                                    className="bg-gray-300"
                                    type="text"
                                    value={idCategoria}
                                    readOnly
                                />
                            </InputGroup>
                            <InputGroup>
                                <Label>Nome da Categoria:</Label>
                                <Input
                                    placeholder="Nome da categoria"
                                    type="text"
                                    value={nomeCategoria}
                                    onChange={(e) => setNomeCategoria(e.target.value)}
                                />
                            </InputGroup>
                            <BotaoContainer>
                                <BotaoPrincipal
                                    type="submit"
                                    className="px-6 py-3 text-base font-medium"
                                >
                                    Atualizar
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

export default AtualizarCategoria;


