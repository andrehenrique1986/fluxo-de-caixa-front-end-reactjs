import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { subcategoriaActions } from "../../../../redux/reducers/subcategoriaReducer";
import { adicionarNovaSubcategoria, listarSubcategoria } from "../../../../api/subcategoriaAPI";
import BotaoPrincipal from "../../../BotaoPrincipal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
       max-w-2xl 
       p-6 
       relative
       bg-auto`
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
       items-center
       gap-4`
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
       items-center
       gap-4`
       }
`;

const InputGroup = styled.div`
  ${tw`flex 
       items-center 
       gap-4`
       }
`;


const Label = styled.label`
  ${tw`w-32 
       font-medium 
       text-right`
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
       items-center
       mt-4`
       }
`;


const AdicionarSubcategoria = ({ aberto, fechado}) => {
  const dispatch = useDispatch();
  const categoriaSelecionada = useSelector(state => state.categorias.categoriaSelecionada);

  const [idCategoria, setIdCategoria] = useState(null);
  const [nomeDaCategoria, setNomeDaCategoria] = useState('');
  const [nomeSubcategoria, setNomeSubcategoria] = useState("");
  const [idSubcategoria, setIdSubcategoria] = useState(null);

  useEffect(() => {
    const fetchProximoSubcategoriaId = async () => {
      try {
        const subcategorias = await listarSubcategoria();
        const ultimoId = subcategorias.reduce(
          (maxId, subcategoria) => Math.max(maxId, subcategoria?.idDaSubcategoria || 0),
          0
        );
        setIdSubcategoria(ultimoId + 1);
      } catch (error) {
        console.error("Erro ao obter subcategorias", error);
        dispatch(subcategoriaActions.erroSubcategoriaReducer(`Erro ao obter subcategorias: ${error.message}`));
      }
    };

    if (aberto) {
      if (categoriaSelecionada) {
        setIdCategoria(categoriaSelecionada.id);
        setNomeDaCategoria(categoriaSelecionada.nomeDaCategoria || '');
        fetchProximoSubcategoriaId();
      } else {
        toast.error("Categoria selecionada é inválida ou não foi definida.");
      }
    }
  }, [aberto, categoriaSelecionada, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!nomeSubcategoria.trim()) {
      toast.warning("O nome da subcategoria é obrigatório.");
      return;
    }

    try {
      const novaSubcategoria = {
        IdCategoria: idCategoria,
        DscTipoCategoria: nomeDaCategoria,
        DscTipoSubcategoria: nomeSubcategoria,
        IdDaSubcategoria: idSubcategoria
      };
      await adicionarNovaSubcategoria(novaSubcategoria);

      
      const subcategoriasAtualizadas = await listarSubcategoria();
      dispatch(subcategoriaActions.carregarSubcategoriasReducer(subcategoriasAtualizadas));
      toast.success("Subcategoria cadastrada com sucesso!");
      setNomeSubcategoria("");
      fechado();
    } catch (error) {
      toast.error(`Erro ao adicionar uma nova subcategoria: ${error.message}`);
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
            <TituloModal>Inserir Subcategoria</TituloModal>
            <InputsContainer>
              <InputGroup>
                <Label>ID da Categoria: </Label>
                <Input className="bg-gray-300" value={idCategoria || ""} readOnly />
              </InputGroup>
              <InputGroup>
                <Label>Nome da Categoria: </Label>
                <Input className="bg-gray-300" value={nomeDaCategoria || ""} readOnly />
              </InputGroup>
              <InputGroup>
                <Label>Nome da Subcategoria: </Label>
                <Input
                  placeholder="Nome da subcategoria"
                  value={nomeSubcategoria}
                  onChange={(e) => setNomeSubcategoria(e.target.value)}
                />
              </InputGroup>
            </InputsContainer>
            <BotaoContainer>
              <BotaoPrincipal type="submit">
                Cadastrar
              </BotaoPrincipal>
            </BotaoContainer>
          </Formulario>
        </ConteudoModal>
      </SobreposicaoModal>
      <ToastContainer />
    </>
  );
};

export default AdicionarSubcategoria;

