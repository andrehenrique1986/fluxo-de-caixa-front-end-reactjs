import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { listarRegistro } from "../../api/registroAPI";
import { registroActions } from "../../redux/reducers/registroReducer";
import AtualizarRegistro from "../../components/Modais/ModalRegistro/AtualizarRegistro";
import { toast } from "react-toastify";

const formatarData = (data) => {
  if (typeof data === 'string') {
    const [ano, mes, dia] = data.split('-');
    return `${dia.substring(0, 2)}/${mes}/${ano}`;
  } else {
    console.error("Erro ao formatar data:", data);
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

// Componente principal
const Painel = () => {
  const dispatch = useDispatch();
  const registros = useSelector(state => state.registros.registros || []);
  const [modalAtualizarRegistro, setModalAtualizarRegistro] = useState(false);
  const [registroAtual, setRegistroAtual] = useState(null);

  const abrirModalAtualizarRegistro = (registro) => {
    setRegistroAtual(registro);
    setModalAtualizarRegistro(true);
  }

  const fecharModalAtualizarRegistro = () => {
    setModalAtualizarRegistro(false);
    setRegistroAtual(null);
  }



  useEffect(() => {
    const listarRegistros = async () => {
      try {
        const data = await listarRegistro();
        dispatch(registroActions.carregarRegistrosReducer(data));
      } catch (error) {
        dispatch(registroActions.erroRegistroReducer(`Erro ao carregar os registros: ${error.message}`));
      }
    };

    listarRegistros();
  }, [dispatch]);


  
  const handleSuccessAtualizarRegistro = (registro, registroAtualizado) => {
    if (registroAtualizado) {
      dispatch(registroActions.atualizarRegistroReducer(registro));
      toast.success("Registro atualizado com sucesso!");
    }
    setModalAtualizarRegistro(false);
  };

  const handleErrorAtualizarRegistro = (erro) => {
    toast.error("Erro ao atualizar uma registro: " + erro.message);
  };

  

  return (
    <Container>
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
          {registros.length > 0 ? (
            registros.map(registro => (
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
                  <Icone><FaTrashAlt className="text-red-600" /></Icone>
                </CelulaTabela>
              </LinhaTabela>
            ))
          ) : (
            <LinhaTabela>
              <CelulaTabela colSpan="10">Nenhum registro encontrado</CelulaTabela>
            </LinhaTabela>
          )}
        </CorpoTabela>
      </Tabela>
      {registroAtual && (
        <AtualizarRegistro 
          aberto={modalAtualizarRegistro}
          fechado={fecharModalAtualizarRegistro}
          registroId={registroAtual.id}
          categoriaId={registroAtual?.idCategoria}
          subcategoriaId={registroAtual?.idSubcategoria}
          custoId={registroAtual?.idCusto}
          fluxoId={registroAtual?.idFluxo}
          formaDePagamentoId={registroAtual?.idFormaDePagamento}
          dataFormatada={registroAtual?.dataRegistro}
          fluxoSelecionado={registroAtual?.tipoDeFluxo}
          categoriaSelecionada={registroAtual?.categoriaNome}
          subCategoriaSelecionada={registroAtual?.subcategoriaNome}
          custoSelecionado={registroAtual?.tipoDeCusto}
          formaDePagamentoSelecionada={registroAtual?.formaDePagamento}
          valorEscolhido={registroAtual?.valor}
          onSuccess={handleSuccessAtualizarRegistro}
          onError={handleErrorAtualizarRegistro}
        />
      )}
      
    </Container>
    
  );
};

export default Painel;











