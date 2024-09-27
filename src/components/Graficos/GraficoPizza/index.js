import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Cell, Pie, PieChart } from "recharts";
import styled from "styled-components";
import tw from "twin.macro";
import { listarCusto } from "../../../api/custoAPI";
import { custoActions } from "../../../redux/reducers/custoReducer";
import { calcularPorcentagemPorCusto } from "../../../api/registroAPI";
import { registroActions } from "../../../redux/reducers/registroReducer";
import { toast } from "react-toastify";


const TextoGrafico = styled.h1`
  ${tw`text-xl text-center my-4`}
`;

const TextoLegenda = styled.h5`
  ${tw`text-sm text-start my-4`}
`;

const Valor = styled.div`
  ${tw``} 
`;

const Legend = styled.div`
  ${tw`flex flex-col mt-4`}
`;

const LegendItem = styled.div`
  ${tw`flex items-center mb-1`}
`;

const Square = styled.div`
  ${tw`w-4 h-4 mr-2`} 
  background-color: ${(props) => props.color};
`;


const COLORS = ["#80ae51", "#a1c082"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const GraficoPizza = () => {
  const dispatch = useDispatch();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [custoDash, setCustoDash] = useState([]);
  const [valorRegistroDataDash, setValorRegistroDataDash] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      try {
        const custoData = await listarCusto();
        dispatch(custoActions.carregarCustosReducer(custoData));

        setCustoDash(custoData);

        const valorRegistroData = await Promise.all(
          custoData.map(c => calcularPorcentagemPorCusto(c.id))
        );

        setValorRegistroDataDash(valorRegistroData);
        dispatch(registroActions.calcPorcentagemPorCustoReducer(valorRegistroData));
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

  const dadosGrafico = custoDash.map((c, index) => {
    const valor = valorRegistroDataDash[index]?.valorTotalRegistro || "0";
    return {
      nome: c.nome,
      valorTotalRegistro: Number(valor),
    };
  });

  return (
    <div>
      <TextoGrafico>Tipo de Custo</TextoGrafico>
      <PieChart width={400} height={400}>
        <Pie
          data={dadosGrafico}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="valorTotalRegistro"
        >
          {dadosGrafico.map((dado, index) => (
            <Cell key={dado.valorTotalRegistro} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <Legend>
      <TextoLegenda className="text-sm">Tipo de Custo</TextoLegenda>
        {dadosGrafico.map((dado, index) => (
          <LegendItem key={dado.nome}>
            <Square color={COLORS[index % COLORS.length]} />
            <span>{`${dado.nome} - ${dado.valorTotalRegistro}%`}</span>
          </LegendItem>
        ))}
      </Legend>
    </div>
  );
};

export default GraficoPizza;



