import styled from "styled-components";
import tw from "twin.macro";
import BotaoPrincipal from "../../BotaoPrincipal";
import BotaoVermelho from "../../BotaoVermelho";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { listarFluxo } from "../../../api/fluxoAPI";
import { listarCategoria } from "../../../api/categoriaAPI";
import { listarSubcategoria } from "../../../api/subcategoriaAPI";
import { listarFormaDePagamento } from "../../../api/formaDePagamentoAPI";
import { listarCusto } from "../../../api/custoAPI";
import { registroActions } from "../../../redux/reducers/registroReducer";
import { excluirRegistro, listarRegistro } from "../../../api/registroAPI";


const SobreposicaoModal = styled.div`
  ${tw`fixed 
       inset-0 
       flex 
       items-center 
       justify-center 
       z-50 
       bg-black 
       bg-opacity-50`}
`;

const ConteudoModal = styled.div`
  ${tw`flex 
       flex-col 
       bg-white 
       rounded-lg 
       shadow-lg 
       w-full 
       max-w-lg 
       p-6 
       relative`}
`;

const BotaoFechar = styled.button`
  ${tw`absolute 
       top-4 
       right-4 
       text-gray-500 
       hover:text-gray-700`}
`;

const TituloModal = styled.h1`
  ${tw`text-2xl 
       mb-4 
       text-center`}
`;

const Texto = styled.p`
    ${tw`items-center 
         text-center
         text-xl
         `}
`;

const BotaoContainer = styled.div`
  ${tw`flex 
       flex-row
       justify-center 
       mt-4
       space-x-2`
       }
`;

const formatDateToDisplay = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
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
  formaDePagamentoId}) => {


  const dispatch = useDispatch();
  const [categoria, setCategoria] = useState([]);
  const [subcategoria, setSubcategoria] = useState([]);
  const [formaPagamento, setFormaPagamento] = useState([]);
  const [fluxo, setFluxo] = useState([]);
  const [custo, setCusto] = useState([]);

  const [registro, setRegistro] = useState(() => ({
    idRegistro: registroId || null,
    dtRegistro: formatDateToDisplay(dataFormatada) || "",
    idFluxo: fluxoId || "",
    fluxo: fluxoSelecionado || "",
    idCategoria: categoriaId || "",
    categoria: categoriaSelecionada || "",
    idSubcategoria: subcategoriaId || "",
    subCategoria: subCategoriaSelecionada || "",
    idCusto: custoId || "",
    custo: custoSelecionado || "",
    idFormaDePagamento: formaDePagamentoId || "",
    formaPagamento: formaDePagamentoSelecionada || "",
    valor: valorEscolhido || "",
  }));
 

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
      tipoCusto: custoSelecionado || "",
      idFormaDePagamento: formaDePagamentoId || "",
      formaPagamento: formaDePagamentoSelecionada || ""
    });
  }, [
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
    formaDePagamentoId
  ]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          fluxoData,
          categoriaData,
          subcategoriaData,
          formaDePagamentoData,
          custoData,
        ] = await Promise.all([
          listarFluxo(),
          listarCategoria(),
          listarSubcategoria(),
          listarFormaDePagamento(),
          listarCusto(),
        ]);
        setFluxo(fluxoData);
        setCategoria(categoriaData);
        setSubcategoria(subcategoriaData);
        setFormaPagamento(formaDePagamentoData);
        setCusto(custoData);
      } catch (error) {
        toast.error("Erro ao carregar os dados: " + error.message);
      }
    };

    fetchData();
  }, []);


  const handleSemRegistro = () => {
    toast.warning("Por favor, preencha todos os campos obrigatórios.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      idRegistro,
      dtRegistro,
      valor,
      idFluxo,
      idCusto,
      idCategoria,
      idSubcategoria,
      idFormaDePagamento,
      

    } = registro;

    if (
      !idRegistro ||
      !dtRegistro ||
      !valor ||
      !idFluxo ||
      !idCusto ||
      !idCategoria ||
      !idSubcategoria ||
      !idFormaDePagamento
    ) {
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
          idSubcategoria: parseInt(idSubcategoria,10),
          idFormaDePagamento: parseInt(idFormaDePagamento, 10)
        };
      
      await excluirRegistro(excluir);
      dispatch(registroActions.excluirRegistroReducer(excluir));
      console.log(excluirRegistro);
      const registrosExcluidos = await listarRegistro();
      dispatch(registroActions.carregarRegistrosReducer(registrosExcluidos));
      toast.success("Registro excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir o registro: " + error.message);
    }
  };

    console.log(registro);
    if (!aberto) return null;

  return(
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
          <TituloModal>Excluir Registro</TituloModal>
                    <Texto>Deseja excluir este registro ?</Texto>
                    <BotaoContainer >
                    <BotaoPrincipal 
                    onClick={handleSubmit}
                    type="submit"
                    className="px-6 py-3 text-base font-medium" 
                    >
                    Sim
                    </BotaoPrincipal>
                    <BotaoVermelho 
                    onClick={fechado}
                    className="px-6 py-3 text-base font-medium"
                    >
                    Não
                    </BotaoVermelho>
                    </BotaoContainer>
        </ConteudoModal>
        <ToastContainer/>
      </SobreposicaoModal>
    
      </>
  )
}

export default ExcluirRegistro;
