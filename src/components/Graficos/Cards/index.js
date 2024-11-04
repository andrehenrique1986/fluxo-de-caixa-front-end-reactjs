import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { listarFluxo } from "../../../api/fluxoAPI";
import { fluxoActions } from "../../../redux/reducers/fluxoReducer";
import { registroActions } from "../../../redux/reducers/registroReducer";
import { calcularRegistroPorFluxo } from "../../../api/registroAPI";


const Container = styled.div``;

const CardContainer = styled.div`
  ${tw`flex 
       flex-col 
       gap-4 
       text-center`
       }
`;

const CardRow = styled.div`
  ${tw`flex 
       gap-4`
       }
`;

const Card = styled.div(({ saldo }) => [
  tw`shadow-md 
     rounded-lg 
     p-4 
     flex-1`,
  saldo < 0 ? tw`bg-red-300` : tw`bg-[#80ae51]`
]);

const CardSaida = styled(Card)`
  ${tw`bg-[#f5c8a8]`}
`;

const Valor = styled.h4(({ saldo }) => [
  tw`text-xl`,
  saldo < 0 ? tw`text-red-700` : tw`text-black`
]);

const TipoFluxo = styled.span`
  ${tw`text-xs`}
`;

const Saldo = styled.span`
  ${tw`text-xs`}
`;

const TextoGrafico = styled.h1`
  ${tw`text-xl 
       text-center 
       my-4`
       }
`;



const formatarValor = (valor) => {
  const parsedValue = parseFloat(valor.replace(/[R$,.]/g, '').trim()) / 100 || 0;
  return parsedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Cards = () => {
  const dispatch = useDispatch();
  const [fluxoCard, setFluxoCard] = useState([]);
  const [valorCard, setValorCard] = useState([]);
  const [loadingState, setLoadingState] = useState({ loading: true, error: null });

  useEffect(() => {
    const buscarDados = async () => {
      setLoadingState({ loading: true, error: null });
      try {
        const fluxoData = await listarFluxo();
        dispatch(fluxoActions.carregarFluxosReducer(fluxoData));
        setFluxoCard(fluxoData);

        const valorRegistroData = await Promise.all(
          fluxoData.map(fl => calcularRegistroPorFluxo(fl.id))
        );

        setValorCard(valorRegistroData);
        dispatch(registroActions.calcRegistroPorFluxoReducer(valorRegistroData));

      } catch (error) {
        toast.error(`Erro ao carregar dados: ${error.message}`);
        setLoadingState({ loading: false, error: error.message });
      } finally {
        setLoadingState(prev => ({ ...prev, loading: false }));
      }
    };

    buscarDados();
  }, [dispatch]);

  const dadosCard = fluxoCard.map((fl, index) => {
    const { entrada = "0", saida = "0", saldo = "0" } = valorCard[index] || {};

    return {
      valorEntradaFormatado: formatarValor(entrada),
      valorSaidaFormatado: formatarValor(saida),
      valorSaldoFormatado: formatarValor(saldo),
      saldo: parseFloat(saldo.replace(/[R$,.]/g, '').trim()) / 100 || 0,
    };
  });

  if (loadingState.loading) {
    return <div>Carregando...</div>;
  }

  if (loadingState.error) {
    return <div>{`Erro: ${loadingState.error}`}</div>;
  }

  return (
    <Container>
      <TextoGrafico>Saldo Total por Fluxo</TextoGrafico>
      {dadosCard.length > 0 && (
        <CardContainer>
          <CardRow>
            <Card>
              <Valor>{dadosCard[0].valorEntradaFormatado}</Valor>
              <TipoFluxo>Entrada</TipoFluxo>
            </Card>
            <CardSaida>
              <Valor>{dadosCard[0].valorSaidaFormatado}</Valor>
              <TipoFluxo>Saída</TipoFluxo>
            </CardSaida>
          </CardRow>
          <Card saldo={dadosCard[0].saldo}>
            <Valor saldo={dadosCard[0].saldo}>
              {dadosCard[0].valorSaldoFormatado}
            </Valor>
            <Saldo>Saldo</Saldo>
          </Card>
        </CardContainer>
      )}
    </Container>
  );
};

export default Cards;




