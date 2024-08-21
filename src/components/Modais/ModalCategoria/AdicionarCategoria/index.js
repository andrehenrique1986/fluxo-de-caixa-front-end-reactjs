import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { adicionarNovaCategoria, listarCategoria } from "../../../../api/categoriaAPI";
import { listarSubcategoria } from "../../../../api/subcategoriaAPI";
import { categoriaActions } from "../../../../redux/reducers/categoriaReducer";
import BotaoPrincipal from "../../../BotaoPrincipal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { subcategoriaActions } from "../../../../redux/reducers/subcategoriaReducer";

const SobreposicaoModal = styled.div`
  ${tw`fixed 
       inset-0 
       flex 
       items-center 
       justify-center 
       z-50 
       bg-black 
       bg-opacity-50`
       }
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
       relative`
       }
`;

const BotaoFechar = styled.button`
  ${tw`absolute 
       top-4 
       right-4 
       text-gray-500 
       hover:text-gray-700`
       }
`;

const Formulario = styled.form`
  ${tw`flex 
       flex-col 
       space-y-4`
       }
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
       rounded`
       }
`;

const BotaoContainer = styled.div`
  ${tw`flex 
       justify-center 
       mt-4`
       }
`;

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
        toast.error("Erro ao obter categorias: " + error.message);
      }
    };

    if (aberto) {
      fetchProximoCategoriaId();
    }
  }, [aberto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nomeCategoria.trim()) {
      toast.error("O nome da categoria é obrigatório.");
      return;
    }

    try {
      const novaCategoria = {
        idCategoria: novoId,
        DscTipoCategoria: nomeCategoria,
      };
      await adicionarNovaCategoria(novaCategoria);
      dispatch(categoriaActions.adicionarCategoriaReducer(novaCategoria));

      const categoriasAtualizadas = await listarCategoria();
      const subcategoriasAtualizadas = await listarSubcategoria();
      dispatch(categoriaActions.carregarCategoriasReducer(categoriasAtualizadas));
      dispatch(subcategoriaActions.carregarSubcategoriasReducer(subcategoriasAtualizadas));

      toast.success("Categoria cadastrada com sucesso!");
      setNomeCategoria("");
      fechado();
    } catch (error) {
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
          <Formulario onSubmit={handleSubmit}>
            <TituloModal>Inserir Categoria</TituloModal>
            <InputsContainer>
              <InputGroup>                
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

