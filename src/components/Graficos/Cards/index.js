import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { listarFluxo } from "../../../api/fluxoAPI";
import { fluxoActions } from "../../../redux/reducers/fluxoReducer";
import { registroActions } from "../../../redux/reducers/registroReducer";
import { calcularRegistroPorFluxo } from "../../../api/registroAPI";

const CardContainer = styled.div`
  ${tw`flex flex-col gap-4 text-center`}
`;

const CardRow = styled.div`
  ${tw`flex gap-4`}
`;

const Card = styled.div`
  ${tw`bg-[#80ae51] shadow-md rounded-lg p-4 flex-1`}
`;

const CardSaida = styled.div`
  ${tw`bg-[#f5c8a8] shadow-md rounded-lg p-4 flex-1`}
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
  ${tw`text-xl text-center my-4`}
`;

const Cards = () => {
  const dispatch = useDispatch();
  const [fluxoCard, setFluxoCard] = useState([]);
  const [valorCard, setValorCard] = useState([]);
  const [carregando, setCarrgegando] = useState(true);
  const [erro, setErro] = useState(null);
  

  useEffect(() => {
    const buscarDados = async () => {
      setCarrgegando(true);
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
        toast.error("Erro ao carregar dados: " + error.message);
        setErro(error.message);
      } finally {
        setCarrgegando(false);
      }
    };

    buscarDados();
  }, [dispatch]);


  const dadosCard = fluxoCard.map((fl, index) => {
    const valorEntrada = valorCard[index]?.entrada || "0";
    const valorSaida = valorCard[index]?.saida || "0";
    const valorSaldo = valorCard[index]?.saldo || "0";

    const entrada = parseFloat(valorEntrada.replace(/[R$,.]/g, '').trim()) / 100 || 0;
    const saida = parseFloat(valorSaida.replace(/[R$,.]/g, '').trim()) / 100 || 0;
    const saldo = parseFloat(valorSaldo.replace(/[R$,.]/g, '').trim()) / 100 || 0;

    return {
      valorEntradaFormatado: entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      valorSaidaFormatado: saida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      valorSaldoFormatado: saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    };
  });

  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (erro) {
    return <div>{`Erro: ${erro}`}</div>;
  }

  return (
    <div>
      <TextoGrafico>Saldo Total por Fluxo</TextoGrafico>
      {dadosCard.length > 0 && (
        <CardContainer key={dadosCard[0].fluxo}>
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
          <Card>
            <Valor saldo={dadosCard[0].saldo}>
            {dadosCard[0].valorSaldoFormatado}
            </Valor>
            <Saldo>Saldo</Saldo>
          </Card>
        </CardContainer>
      )}
    </div>
  );
};

export default Cards;



