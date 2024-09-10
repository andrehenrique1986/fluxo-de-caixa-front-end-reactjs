import React, { useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { listarRegistro } from "../../api/registroAPI";
import { registroActions } from "../../redux/reducers/registroReducer";


const formatarData = (data) => {
  const [ano, mes, dia] = data.split('-');
  return `${dia.substring(0, 2)}/${mes}/${ano}`;
};

const Container = styled.div`
  ${tw`p-5 bg-gray-100 mt-1 flex justify-center`}
`;

const Tabela = styled.table`
  ${tw`w-full border-collapse text-center`}
`;

const CabecalhoTabela = styled.thead`
  ${tw`bg-gray-200 font-bold`}
`;

const LinhaTabela = styled.tr`
  ${tw`border-b border-gray-300`}
`;

const CelulaTabela = styled.td`
  ${tw`p-2 text-center`}
`;

const CorpoTabela = styled.tbody``;

const Icone = styled.div`
  ${tw`cursor-pointer text-gray-600 hover:text-gray-800`}
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Painel = () => {
  const dispatch = useDispatch();
  const registros = useSelector(state => state.registros.registros || []); 

  useEffect(() => {
    const listarRegistros = async () => {
      try {
        const data = await listarRegistro();
        console.log('Dados retornados da API:', data);
        dispatch(registroActions.carregarRegistrosReducer(data));
        
      } catch (error) {
        console.error("Erro ao carregar os registros:", error);
        dispatch(registroActions.erroRegistroReducer("Erro ao carregar os registros:", error.message));
      }
    };

    listarRegistros();
  }, [dispatch]);

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
                <CelulaTabela>{registro.valor}</CelulaTabela>
                <CelulaTabela><Icone><BsFillPencilFill className="text-gray-500" /></Icone></CelulaTabela>
                <CelulaTabela><Icone><FaTrashAlt className="text-red-600" /></Icone></CelulaTabela>
              </LinhaTabela>
            ))
          ) : (
            <LinhaTabela>
              <CelulaTabela colSpan="10">Nenhum registro encontrado</CelulaTabela>
            </LinhaTabela>
          )}
        </CorpoTabela>
      </Tabela>
    </Container>
  );
};

export default Painel;






