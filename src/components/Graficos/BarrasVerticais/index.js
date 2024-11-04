import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Bar,
  BarChart,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import tw from "twin.macro";
import { listarFormaDePagamento } from "../../../api/formaDePagamentoAPI";
import { formaDePagamentoActions } from "../../../redux/reducers/formaDePagamentoReducer";
import { calcularRegistroPorFormasDePagamento } from "../../../api/registroAPI";
import { registroActions } from "../../../redux/reducers/registroReducer";
import { toast } from "react-toastify";



const Container = styled.div``;

const TextoGrafico = styled.h1`
  ${tw`text-xl 
       text-center 
       my-4`
       }
`;

const Valor = styled.div``;

const BarrasVerticais = () => {
  const dispatch = useDispatch();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [formaDePagamentoDash, setFormaDePagamentoDash] = useState([]);
  const [valorRegistroDataDash, setValorRegistroDataDash] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      try {
        const formaDePagamentoData = await listarFormaDePagamento();
        dispatch(formaDePagamentoActions.carregarFormaDePagamentoReducer(formaDePagamentoData));

        setFormaDePagamentoDash(formaDePagamentoData);

        const valorRegistroData = await Promise.all(
          formaDePagamentoData.map((f) => calcularRegistroPorFormasDePagamento(f.id))
        );

        setValorRegistroDataDash(valorRegistroData);
        dispatch(registroActions.calcRegistroPorFormaDePagamentoReducer(valorRegistroData));
      } catch (error) {
        toast.error("Erro ao carregar dados: " + error.message);
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, [dispatch]);

  if (carregando) {
    return <Valor>Carregando ...</Valor>;
  }

  if (erro) {
    return <Valor>{erro}</Valor>;
  }

  const dadosGrafico = formaDePagamentoDash
    .map((f, index) => {
      const valor = valorRegistroDataDash[index]?.valorTotalFormaDePagamento || "0";
      const valorTotalDaFormaDePagamento = parseFloat(valor.replace(/[R$,.]/g, "").trim()) / 100 || 0;

      return {
        nome: f.nome,
        valorTotalFormaDePagamento: valorTotalDaFormaDePagamento,
        valorFormatado: valorTotalDaFormaDePagamento.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      };
    })
    .sort((a, b) => b.valorTotalFormaDePagamento - a.valorTotalFormaDePagamento);

  return (
    <Container>
      <TextoGrafico>Formas de pagamento</TextoGrafico>
      <BarChart width={400} height={300} data={dadosGrafico}>
        <XAxis type="category" dataKey="nome" fontSize={10}/>
        <YAxis  fontSize={10}/>
        <Tooltip />
        <Bar dataKey="valorTotalFormaDePagamento" fill="#8884d8" >
          <LabelList dataKey="valorFormatado" position="outside" fill="#000" fontSize={10}/>
        </Bar>
      </BarChart>
    </Container>
  );
};

export default BarrasVerticais;

