import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import styled from "styled-components";
import tw from "twin.macro";
import { listarCategoria } from "../../../api/categoriaAPI";
import { calcularGastosPorCategoria } from "../../../api/registroAPI";
import { categoriaActions } from "../../../redux/reducers/categoriaReducer";
import { registroActions } from "../../../redux/reducers/registroReducer";
import { toast } from "react-toastify";

const Container = styled.div`
  ${tw`flex 
       flex-col 
       items-center`
       }
`;

const GraphContainer = styled.div`
  ${tw`flex 
      justify-center 
      w-full 
      max-w-4xl`
      } /* Define a largura máxima do gráfico */
`;

const TextoGrafico = styled.h1`
  ${tw`text-xl 
       text-center 
       my-4`
       }
`;

const Valor = styled.div``;

const BarrasHorizontais = () => {
  const dispatch = useDispatch();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [categoriasDash, setCategoriasDash] = useState([]);
  const [valorRegistroDataDash, setValorRegistroDataDash] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      try {
        const categoriaData = await listarCategoria();
        dispatch(categoriaActions.carregarCategoriasReducer(categoriaData));

        setCategoriasDash(categoriaData);

        const valorRegistroData = await Promise.all(
          categoriaData.map((cat) => calcularGastosPorCategoria(cat.id))
        );

        setValorRegistroDataDash(valorRegistroData);

        dispatch(
          registroActions.calcGastosPorCategoriaReducer(valorRegistroData)
        );
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

  const dadosGrafico = categoriasDash.map((cat, index) => {
    const valor = valorRegistroDataDash[index]?.valorTotalCategoria || "0";
    const valorTotalCategoria =
      parseFloat(valor.replace(/[R$,.]/g, "").trim()) / 100 || 0;

    return {
      nomeDaCategoria: cat.nomeDaCategoria,
      valorTotalCategoria: valorTotalCategoria,
      valorFormatado: valorTotalCategoria.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    };
  });

  return (
    <Container>
      <TextoGrafico>Gastos por Categoria</TextoGrafico>
      <GraphContainer>
        <BarChart
          width={window.innerWidth < 640 ? window.innerWidth - 40 : 500} // Ajusta a largura do gráfico
          height={300}
          data={dadosGrafico}
          layout="vertical"
          fontSize={10}
        >
          <XAxis type="number" className="text-xs" />
          <YAxis type="category" dataKey="nomeDaCategoria" className="text-xs" fontSize={10} fill="#000" />
          <Tooltip />
          <Bar dataKey="valorTotalCategoria" fill="#FF8042">
            <LabelList
              dataKey="valorFormatado"
              position="insideLeft"
              fill="#000"
            />
          </Bar>
        </BarChart>
      </GraphContainer>
    </Container>
  );
};

export default BarrasHorizontais;


