import styled from "styled-components";
import tw from "twin.macro";
import BotaoPrincipal from "../../../BotaoPrincipal";
import BotaoVermelho from "../../../BotaoVermelho";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { excluirRegistro, listarRegistro } from "../../../../api/registroAPI";
import { registroActions } from "../../../../redux/reducers/registroReducer";

const SobreposicaoModal = styled.div`
  ${tw`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}
`;

const ConteudoModal = styled.div`
  ${tw`flex flex-col bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative`}
`;

const BotaoFechar = styled.button`
  ${tw`absolute top-4 right-4 text-gray-500 hover:text-gray-700`}
`;

const TituloModal = styled.h1`
  ${tw`text-2xl mb-4 text-center`}
`;

const Texto = styled.p`
  ${tw`text-center text-xl`}
`;

const BotaoContainer = styled.div`
  ${tw`flex flex-row justify-center mt-4 space-x-2`}
`;

const formatDateToDisplay = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
};

const ExcluirRegistro = ({
  aberto,
  fechado,
  registroId,
  dataFormatada,
  fluxoSelecionado,
  categoriaSelecionada,
  subCategoriaSelecionada,
  custoSelecionado,
  formaDePagamentoSelecionada,
  valorEscolhido,
  categoriaId,
  subcategoriaId,
  custoId,
  fluxoId,
  formaDePagamentoId,
  onSuccess
}) => {
  const dispatch = useDispatch();
  const [registro, setRegistro] = useState({});

  useEffect(() => {
    setRegistro({
      idRegistro: registroId || "",
      dtRegistro: formatDateToDisplay(dataFormatada) || "",
      valor: valorEscolhido || "",
      idFluxo: fluxoId || "",
      fluxo: fluxoSelecionado || "",
      idCategoria: categoriaId || "",
      categoria: categoriaSelecionada || "",
      idSubcategoria: subcategoriaId || "",
      subCategoria: subCategoriaSelecionada || "",
      idCusto: custoId || "",
      custo: custoSelecionado || "",
      idFormaDePagamento: formaDePagamentoId || "",
      formaPagamento: formaDePagamentoSelecionada || ""
    });
  }, [registroId, dataFormatada, valorEscolhido, fluxoId, fluxoSelecionado, categoriaId, categoriaSelecionada, subcategoriaId, subCategoriaSelecionada, custoId, custoSelecionado, formaDePagamentoId, formaDePagamentoSelecionada]);

  const handleSemRegistro = () => {
    toast.warning("Por favor, preencha todos os campos obrigatórios.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { idRegistro, valor, idFluxo, idCusto, idCategoria, idSubcategoria, idFormaDePagamento } = registro;

    if (!idRegistro || !valor || !idFluxo || !idCusto || !idCategoria || !idSubcategoria || !idFormaDePagamento) {
      handleSemRegistro();
      return;
    }

    try {
      const excluir = {
        idRegistro: parseInt(idRegistro, 10),
        dtRegistro: new Date(),
        valorRegistro: parseFloat(valor) || 0,
        idFluxo: parseInt(idFluxo, 10),
        idCusto: parseInt(idCusto, 10),
        idCategoria: parseInt(idCategoria, 10),
        idSubcategoria: parseInt(idSubcategoria, 10),
        idFormaDePagamento: parseInt(idFormaDePagamento, 10)
      };


      const response = await excluirRegistro(excluir);
      onSuccess(idRegistro, response.status);
      

    } catch (error) {
      toast.error("Erro ao excluir o registro: " + error.message);
    } 
  };

  if (!aberto) return null;

  return (
    <>
      <SobreposicaoModal>
        <ConteudoModal>
          <BotaoFechar onClick={fechado}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </BotaoFechar>
          <TituloModal>Excluir Registro</TituloModal>
          <Texto>Deseja excluir este registro?</Texto>
          <BotaoContainer>
            <BotaoPrincipal onClick={handleSubmit} type="submit">
              Sim
            </BotaoPrincipal>
            <BotaoVermelho onClick={fechado}>
              Não
            </BotaoVermelho>
          </BotaoContainer>
        </ConteudoModal>
      </SobreposicaoModal>
      <ToastContainer />
    </>
  );
};

export default ExcluirRegistro;
