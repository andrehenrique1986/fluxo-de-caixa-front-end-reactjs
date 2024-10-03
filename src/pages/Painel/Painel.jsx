import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filtrarRegistrosPorData, listarRegistro } from "../../api/registroAPI";
import { registroActions } from "../../redux/reducers/registroReducer";
import AtualizarRegistro from "../../components/Modais/ModalRegistro/AtualizarRegistro";
import { toast, ToastContainer } from "react-toastify";
import ExcluirRegistro from "../../components/Modais/ModalRegistro/ExcluirRegistro";
import 'react-toastify/dist/ReactToastify.css';

const formatarData = (data) => {
  try {
    
    if (data !== undefined && typeof data === 'string') {
      const [ano, mes, dia] = data.split('-');
      return `${dia.substring(0, 2)}/${mes}/${ano}`;
    }
  } catch (error) {
    
    console.error(`Erro ao formatar data: ${data}`, error);
  }
};

const Container = styled.div`
  ${tw`p-5 bg-gray-100 mt-1 flex justify-center max-h-[500px] overflow-x-auto`}
  
  @media (max-width: 768px) {
    ${tw`p-2`}
  }
`;

const Tabela = styled.table`
  ${tw`w-full border-collapse text-center`}
  
  @media (max-width: 768px) {
    ${tw`min-w-[600px]`}
  }
`;

const CabecalhoTabela = styled.thead`
  ${tw`bg-gray-200 font-bold`}
`;

const LinhaTabela = styled.tr`
  ${tw`border-b border-gray-300`}
`;

const CelulaTabela = styled.td`
  ${tw`p-2 text-center`}
  
  @media (max-width: 768px) {
    ${tw`text-xs p-1`}
  }
`;

const CorpoTabela = styled.tbody``;

const Icone = styled.div`
  ${tw`cursor-pointer text-gray-600 hover:text-gray-800 text-xl flex justify-center items-center`}
  
  @media (max-width: 768px) {
    ${tw`text-lg`}
  }
`;

const Painel = ({ dataInicio, dataFim, limparFiltro }) => {
  const dispatch = useDispatch();
  const registros = useSelector(state => state.registros.registros || []);
  const registrosFiltrados = useSelector(state => state.registros.registrosFiltrados || []);
  const [modalAtualizarRegistro, setModalAtualizarRegistro] = useState(false);
  const [modalExcluirRegistro, setModalExcluirRegistro] = useState(false);
  const [registroAtual, setRegistroAtual] = useState(null);
  const [registrosCarregados, setRegistrosCarregados] = useState(true);
  const [dataInicial, setDataInicial] = useState(dataInicio);
  const [dataFinal, setDataFinal] = useState(dataFim);
  
  const abrirModalAtualizarRegistro = (registro) => {
    setRegistroAtual(registro);
    setModalAtualizarRegistro(true);
  };

  const fecharModalAtualizarRegistro = () => {
    setModalAtualizarRegistro(false);
    setRegistroAtual(null);
  };

  const abrirModalExcluirRegistro = (registro) => {
    setRegistroAtual(registro);
    setModalExcluirRegistro(true);
  };

  const fecharModalExcluirRegistro = () => {
    setModalExcluirRegistro(false);
    setRegistroAtual(null);
  };

  useEffect(() => {
    setDataInicial(dataInicio);
    setDataFinal(dataFim);
  }, [dataInicio, dataFim]);

  useEffect(() => {
    const listarRegistros = async () => {
      setRegistrosCarregados(true);
      try {
        const data = (!dataInicial && !dataFinal) 
          ? await listarRegistro() 
          : await filtrarRegistrosPorData({ dataInicial, dataFinal });
  
          dispatch(registroActions.carregarRegistrosReducer(data));  
      } catch (error) {
        dispatch(registroActions.erroRegistroReducer(`Erro ao carregar os registros: ${error.message}`));
      } finally {
        setRegistrosCarregados(false);
      }
    };

    

    listarRegistros();
    
  }, [dispatch, dataInicial, dataFinal]);

  const handleSuccessAtualizarRegistro = (registro, registroAtualizado) => {
    if (registroAtualizado) {
      dispatch(registroActions.atualizarRegistroReducer(registro));
      toast.success("Registro atualizado com sucesso!");
    }
    setModalAtualizarRegistro(false);
  };

  const handleErrorAtualizarRegistro = (erro) => {
    toast.error("Erro ao atualizar o registro: " + erro.message);
  };

  const handleErrorExcluirRegistro = (erro) => {
    toast.error("Erro ao excluir o registro: " + erro.message);
  };

  const handleSuccessExcluirRegistro = async (registro, registroExcluido) => {
    if (registroExcluido) {
      toast.success("Registro excluído com sucesso!");
      dispatch(registroActions.excluirRegistroReducer(registro));
      const registrosExcluidos = await listarRegistro();
      dispatch(registroActions.carregarRegistrosReducer(registrosExcluidos));
  
      if (registros.length === 1) {
        dispatch(registroActions.carregarRegistrosReducer([]));
      }
    } else {
      console.error("Erro ao excluir registro."); 
    }
    setModalExcluirRegistro(false);
  };

  const registroProps = registroAtual ? {
    registroId: registroAtual.id,
    categoriaId: registroAtual.idCategoria,
    subcategoriaId: registroAtual.idSubcategoria,
    custoId: registroAtual.idCusto,
    fluxoId: registroAtual.idFluxo,
    formaDePagamentoId: registroAtual.idFormaDePagamento,
    dataFormatada: registroAtual.dataRegistro,
    fluxoSelecionado: registroAtual.tipoDeFluxo,
    categoriaSelecionada: registroAtual.categoriaNome,
    subCategoriaSelecionada: registroAtual.subcategoriaNome,
    custoSelecionado: registroAtual.tipoDeCusto,
    formaDePagamentoSelecionada: registroAtual.formaDePagamento,
    valorEscolhido: registroAtual.valor,
  } : {};

  const mostrarRegistros = registrosFiltrados.length > 0 ? registrosFiltrados : registros;

  return (
    <Container>
      {registrosCarregados ? (
        <CelulaTabela colSpan="10">Carregando registros...</CelulaTabela>
      ) : mostrarRegistros.length === 0 ? (
        <CelulaTabela colSpan="10">Nenhum registro encontrado!</CelulaTabela>
      ) : (
        <Tabela>
          <CabecalhoTabela>
            <LinhaTabela>
              <CelulaTabela>Id</CelulaTabela>
              <CelulaTabela>Data</CelulaTabela>
              <CelulaTabela>Fluxo</CelulaTabela>
              <CelulaTabela>Categoria</CelulaTabela>
              <CelulaTabela>Sub Categoria</CelulaTabela>
              <CelulaTabela>Tipo Custo</CelulaTabela>
              <CelulaTabela>Forma Pagamento</CelulaTabela>
              <CelulaTabela>Valor</CelulaTabela>
              <CelulaTabela></CelulaTabela>
              <CelulaTabela></CelulaTabela>
            </LinhaTabela>
          </CabecalhoTabela>
          <CorpoTabela>
            {mostrarRegistros.map(registro => (
              <LinhaTabela key={registro.id}>
                <CelulaTabela>{registro.id}</CelulaTabela>
                <CelulaTabela>{formatarData(registro.dataRegistro)}</CelulaTabela>
                <CelulaTabela>{registro.tipoDeFluxo}</CelulaTabela>
                <CelulaTabela>{registro.categoriaNome}</CelulaTabela>
                <CelulaTabela>{registro.subcategoriaNome}</CelulaTabela>
                <CelulaTabela>{registro.tipoDeCusto}</CelulaTabela>
                <CelulaTabela>{registro.formaDePagamento}</CelulaTabela>
                <CelulaTabela>
                  {registro.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </CelulaTabela>
                <CelulaTabela>
                  <Icone onClick={() => abrirModalAtualizarRegistro(registro)}>
                    <BsFillPencilFill className="text-gray-500" />
                  </Icone>
                </CelulaTabela>
                <CelulaTabela>
                  <Icone onClick={() => abrirModalExcluirRegistro(registro)}>
                    <FaTrashAlt className="text-red-600" />
                  </Icone>
                </CelulaTabela>
              </LinhaTabela>
            ))}
          </CorpoTabela>
        </Tabela>
      )}
      {registroAtual && (
        <AtualizarRegistro
          aberto={modalAtualizarRegistro}
          fechado={fecharModalAtualizarRegistro}
          {...registroProps}
          onSuccess={handleSuccessAtualizarRegistro}
          onError={handleErrorAtualizarRegistro}
        />
      )}
      {modalExcluirRegistro && registroAtual && (
        <ExcluirRegistro 
          aberto={modalExcluirRegistro}
          fechado={fecharModalExcluirRegistro}
          {...registroProps}
          onSuccess={handleSuccessExcluirRegistro}
          onError={handleErrorExcluirRegistro}
        />
      )}
      <ToastContainer /> 
    </Container>
  );
};

export default Painel;















