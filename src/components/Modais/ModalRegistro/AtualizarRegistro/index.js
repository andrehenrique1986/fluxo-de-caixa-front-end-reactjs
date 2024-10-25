import styled from "styled-components";
import tw from "twin.macro";
import BotaoPrincipal from "../../../BotaoPrincipal";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { atualizarRegistro, listarRegistro } from "../../../../api/registroAPI";
import { useDispatch } from "react-redux";
import { registroActions } from "../../../../redux/reducers/registroReducer";
import { listarFluxo } from "../../../../api/fluxoAPI";
import { listarCategoria } from "../../../../api/categoriaAPI";
import { listarSubcategoria } from "../../../../api/subcategoriaAPI";
import { listarFormaDePagamento } from "../../../../api/formaDePagamentoAPI";
import { listarCusto } from "../../../../api/custoAPI";
import InputMask from "react-input-mask";

const SobreposicaoModal = styled.div`
  ${tw`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}
`;

const ConteudoModal = styled.div`
  ${tw`flex flex-col bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative`}
`;

const BotaoFechar = styled.button`
  ${tw`absolute top-4 right-4 text-gray-500 hover:text-gray-700`}
`;

const Formulario = styled.form`
  ${tw`flex flex-col space-y-4`}
`;

const TituloModal = styled.h1`
  ${tw`text-2xl mb-4 text-center`}
`;

const InputsContainer = styled.div`
  ${tw`flex flex-col space-y-4`}
`;

const InputGroup = styled.div`
  ${tw`flex items-center space-x-4`}
`;

const Label = styled.label`
  ${tw`w-32 text-right font-medium`}
`;

const BotaoContainer = styled.div`
  ${tw`flex justify-center items-center space-x-4 mt-4`}
`;

const Input = styled.input`
  ${tw`border-2 border-custom-blue p-2 rounded w-3/4 text-black`}
`;

const ComboBox = styled.select`
  ${tw`border-2 border-custom-blue p-2 rounded w-3/4 text-black`}
`;

const ItemComboBox = styled.option``;


const formatDateToDisplay = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatHoursToDisplay = (hourStr) => {
  const date = new Date(hourStr); // Cria um objeto Date a partir da string
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };
  
  return date.toLocaleTimeString('pt-BR', options); // Formata a hora para o padrão brasileiro
};

const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const AtualizarRegistro = ({
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
  formaDePagamentoId
}) => {

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

  const limparRegistros = () => {
    setRegistro({
      idRegistro: null,
      dtRegistro: "",
      fluxo: "",
      categoria: "",
      subCategoria: "",
      tipoCusto: "",
      formaPagamento: "",
      valor: "",
    });
  };

  
  const handleFluxoChange = (e) => {
    const valorSelecionado = e.target.value;
    const fluxoIdSelecionado = fluxo.filter(c => c.nome === valorSelecionado)[0].id;
    setRegistro((prevState) => ({
      ...prevState,
      fluxo: valorSelecionado,
      idFluxo: fluxoIdSelecionado
    }));
  };


  // Atualiza a categoria e reseta a subcategoria
  const handleCategoriaChange = (e) => {
    const valorSelecionado = e.target.value;
    const categoriaIdSelecionada = categoria.filter(c => c.nomeDaCategoria === valorSelecionado)[0].id;
    setRegistro((prevState) => ({
      ...prevState,
      categoria: valorSelecionado,
      subCategoria: "",
      idCategoria: categoriaIdSelecionada
    }));
  };

  // Atualiza a subcategoria
  const handleSubCategoriaChange = (e) => {
    const valorSelecionado = e.target.value;
    const subcategoriaIdSelecionada = subcategoria.filter(n => n.nomeDaSubcategoria === valorSelecionado)[0].idDaSubcategoria;
    setSubcategoria(valorSelecionado);
    setRegistro((prevState) => ({
      ...prevState,
      subCategoria: valorSelecionado,
      idSubcategoria: subcategoriaIdSelecionada
    }));
  };

  const handleCustoChange = (e) => {
    const valorSelecionado = e.target.value;
    const custoIdSelecionado = custo.filter(c => c.nome === valorSelecionado)[0].id;
    setRegistro((prevState) => ({
      ...prevState,
      tipoCusto: valorSelecionado,
      idCusto: custoIdSelecionado
    }));
  };



  const handleFormaDePagamentoChange = (e) => {
    const valorSelecionado = e.target.value;
    const formaDePagamentoIdSelecionada = formaPagamento.filter(c => c.nome === valorSelecionado)[0].id;
    setRegistro((prevState) => ({
      ...prevState,
      formaPagamento: valorSelecionado,
      idFormaDePagamento: formaDePagamentoIdSelecionada
    }));
  };


  const handleValorChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");
    value = parseFloat(value) / 100;
    setRegistro((prevState) => ({
      ...prevState,
      valor: value,
    }));
  };

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
        const alterarRegistro = {
          idRegistro: parseInt(idRegistro, 10),
          dtRegistro: formatDateForInput(dtRegistro),
          valorRegistro: parseFloat(valor) || 0,
          idFluxo: parseInt(idFluxo, 10),
          idCusto: parseInt(idCusto, 10),
          idCategoria: parseInt(idCategoria, 10),
          idSubcategoria: parseInt(idSubcategoria,10),
          idFormaDePagamento: parseInt(idFormaDePagamento, 10)
        };
      
      await atualizarRegistro(alterarRegistro);
      dispatch(registroActions.atualizarRegistroReducer(alterarRegistro));
      const registrosAtualizados = await listarRegistro();
      dispatch(registroActions.carregarRegistrosReducer(registrosAtualizados));
      const dataAtualizacao = formatDateToDisplay(new Date (Date.now()));
      const horaAtualizacao = formatHoursToDisplay(new Date (Date.now()));
      toast.success(`Registro atualizado com sucesso! Atualizado em: ${dataAtualizacao} às ${horaAtualizacao}`);
      fechado();
    } catch (error) {
      toast.error("Erro ao atualizar o registro: " + error.message);
    }
  };

  
  if (!aberto) return null;

 

  return (
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
          <Formulario onSubmit={handleSubmit}>
            <TituloModal>Atualizar Registro</TituloModal>
            <InputsContainer>

              <InputGroup>
                <Label>ID do Registro: </Label>
              <Input
                readOnly
                className="bg-gray-300"
                value={registro.idRegistro}/>
              </InputGroup>

              <InputGroup>
                <Label>Tipo de Fluxo:</Label>
                <ComboBox
                  onChange={handleFluxoChange}
                  name="fluxo"
                  value={registro.fluxo}
                >
                  <ItemComboBox value="">Selecione um Tipo de Fluxo</ItemComboBox>
                  {fluxo.map((f) => (
                    <ItemComboBox key={f.id} value={f.nome}>
                      {f.nome}
                    </ItemComboBox>
                  ))}
                </ComboBox>
              </InputGroup>

              <InputGroup>
                <Label>Categoria:</Label>
                <ComboBox
                  onChange={handleCategoriaChange}
                  value={registro.categoria}
                >
                  <ItemComboBox value="">Selecione uma Categoria</ItemComboBox>
                  {categoria.map((c) => (
                    <ItemComboBox key={c.id} value={c.nomeDaCategoria}>
                      {c.nomeDaCategoria}
                    </ItemComboBox>
                  ))}
                </ComboBox>
              </InputGroup>

              <InputGroup>
                <Label>Sub Categoria:</Label>
                <ComboBox
                  onChange={handleSubCategoriaChange}
                  name="subCategoria"
                  value={registro.subCategoria}
                  disabled={!categoriaSelecionada}
                >
                  <ItemComboBox value="">Selecione uma Sub Categoria</ItemComboBox>
                  {categoria
                  .filter((c) => c.nomeDaCategoria === registro.categoria)
                  .map((cat) =>
                    cat.nomeDaSubcategoria.map((s) => (
                      <ItemComboBox
                        key={s.nomeDaSubcategoria}
                        value={s.nomeDaSubcategoria}
                      >
                        {s.nomeDaSubcategoria}
                      </ItemComboBox>
                    ))
                  )}
                </ComboBox>
              </InputGroup>

              <InputGroup>
                <Label>Tipo de Custo:</Label>
                <ComboBox
                  onChange={handleCustoChange}
                  name="tipoCusto"
                  value={registro.tipoCusto}
                >
                  <ItemComboBox value="">Selecione um Tipo de Custo</ItemComboBox>
                  {custo.map((c) => (
                    <ItemComboBox key={c.id} value={c.nome}>
                      {c.nome}
                    </ItemComboBox>
                  ))}
                </ComboBox>
              </InputGroup>

              <InputGroup>
                <Label>Forma Pagamento:</Label>
                <ComboBox
                  onChange={handleFormaDePagamentoChange}
                  name="formaPagamento"
                  value={registro.formaPagamento}
                >
                  <ItemComboBox value="">Selecione uma Forma de Pagamento</ItemComboBox>
                  {formaPagamento.map((f) => (
                    <ItemComboBox key={f.id} value={f.nome}>
                      {f.nome}
                    </ItemComboBox>
                  ))}
                </ComboBox>
              </InputGroup>

              <InputGroup>
                <Label>Valor:</Label>
                <InputMask
                  id="valor"
                  name="valor"
                  className="border-2 border-custom-blue p-2 rounded w-3/4 text-black"
                  value={registro.valor ? registro.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}
                  onChange={handleValorChange}
                />
              </InputGroup>
            </InputsContainer>
            <BotaoContainer>
              <BotaoPrincipal
                type="submit"
                className="px-6 py-3 text-base font-medium"
              >
                Atualizar
              </BotaoPrincipal>
              <BotaoPrincipal
                type="button"
                className="px-6 py-3 text-base font-medium"
                onClick={limparRegistros}
              >
                Limpar
              </BotaoPrincipal>
            </BotaoContainer>
          </Formulario>
          <ToastContainer />
        </ConteudoModal>
      </SobreposicaoModal>
    </>
  );
};

export default AtualizarRegistro;
