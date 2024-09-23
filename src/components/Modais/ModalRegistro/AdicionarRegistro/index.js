import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { adicionarRegistro, listarRegistro } from "../../../../api/registroAPI";
import { listarCategoria } from "../../../../api/categoriaAPI";
import { listarSubcategoria } from "../../../../api/subcategoriaAPI";
import { listarFormaDePagamento } from "../../../../api/formaDePagamentoAPI";
import { listarCusto } from "../../../../api/custoAPI";
import { listarFluxo } from "../../../../api/fluxoAPI";
import BotaoPrincipal from "../../../BotaoPrincipal";
import { registroActions } from "../../../../redux/reducers/registroReducer";
import 'react-toastify/dist/ReactToastify.css';

// Styled Components
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
  ${tw`w-32 text-right font-medium text-black`}
`;

const Input = styled.input`
  ${tw`border-2 border-custom-blue p-2 rounded w-3/4 text-black`}
`;

const ComboBox = styled.select`
  ${tw`border-2 border-custom-blue p-2 rounded w-3/4 text-black`}
`;

const ItemComboBox = styled.option``;

const BotaoContainer = styled.div`
  ${tw`flex justify-center items-center space-x-4 mt-4`}
`;

const formatDateToDisplay = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


const formatDateForInput = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month}-${day}`;
};


const AdicionarRegistro = ({ aberto, fechado }) => {
  const dispatch = useDispatch();
  const [categoria, setCategoria] = useState([]);
  const [subcategoria, setSubcategoria] = useState([]);
  const [formaDePagamento, setFormaDePagamento] = useState([]);
  const [fluxo, setFluxo] = useState([]);
  const [custo, setCusto] = useState([]);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [subCategoriaSelecionada, setSubCategoriaSelecionada] = useState("");
  const [registro, setRegistro] = useState({
    idRegistro: null,
    dtRegistro: "",
    fluxo: "",
    categoria: "",
    subCategoria: "",
    tipoCusto: "",
    formaPagamento: "",
    valor: "",
  });

  useEffect(() => {
    if (aberto) {
      limparRegistros();
      fetchData();
    }
  }, [aberto]);


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
      setFormaDePagamento(formaDePagamentoData);
      setCusto(custoData);
    } catch (error) {
      toast.error("Erro ao carregar os dados: " + error.message);
    }
  };

  const limparRegistros = () => {
    
    setRegistro({
      idRegistro: null,
      dtRegistro: Date.now(),
      fluxo: "",
      categoria: "",
      subCategoria: "",
      tipoCusto: "",
      formaPagamento: "",
      valor: "",
    });
    setCategoriaSelecionada("");
    setSubCategoriaSelecionada("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dtRegistro') {
      setRegistro((prevState) => ({
        ...prevState,
        [name]: value,
        dtRegistro: formatDateToDisplay(formatDateForInput(value)),
      }));
    } else {
      setRegistro((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCategoriaChange = (e) => {
    const valorSelecionado = e.target.value;
    setCategoriaSelecionada(valorSelecionado);
    setRegistro((prevState) => ({
      ...prevState,
      categoria: valorSelecionado,
      subCategoria: "",
    }));
  };

  const subCategoriasFiltradas = subcategoria.filter(
    (s) => s.idDaCategoria === parseInt(categoriaSelecionada)
  );

  const handleSubCategoriaChange = (e) => {
    const valorSelecionado = e.target.value;
    setSubCategoriaSelecionada(valorSelecionado);
    setRegistro((prevState) => ({
      ...prevState,
      subCategoria: valorSelecionado,
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

    const { dtRegistro, valor, fluxo, tipoCusto, categoria, subCategoria ,formaPagamento } = registro;

    if (!dtRegistro || !valor || !fluxo || !tipoCusto || !categoria || !subCategoria || !formaPagamento) {
      handleSemRegistro();
      return;
    }

    try {
      const novoRegistro = {
        dtRegistro: new Date(Date.now()),
        valorRegistro: parseFloat(valor),
        idFluxo: parseInt(fluxo, 10),
        idCategoria: parseInt(categoria, 10),
        idSubcategoria: parseInt(subCategoria, 10) || 0,
        idCusto: parseInt(tipoCusto, 10),
        idFormaDePagamento: parseInt(formaPagamento, 10),
      };

      await adicionarRegistro(novoRegistro);
      dispatch(registroActions.adicionarRegistroReducer(novoRegistro));
      console.log(novoRegistro);
      const registrosAtualizados = await listarRegistro();
      dispatch(registroActions.carregarRegistrosReducer(registrosAtualizados));
      const dataFormatada = formatDateToDisplay(novoRegistro.dtRegistro);
      toast.success(`Registro adicionado com sucesso! Adicionado em: ${dataFormatada}`);
      fechado();
    } catch (error) {
      toast.error("Erro ao adicionar o registro: " + error.message);
    }
  };

  console.log(registro);
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
            <TituloModal>Adicionar Registro</TituloModal>
            <InputsContainer>
              <InputGroup>
                <Label>Tipo de Fluxo:</Label>
                <ComboBox
                  onChange={handleChange}
                  name="fluxo"
                  value={registro.fluxo}
                >
                  <ItemComboBox value="">Selecione um Tipo de Fluxo</ItemComboBox>
                  {fluxo.map((f) => (
                    <ItemComboBox key={f.id} value={f.id}>
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
                    <ItemComboBox key={c.id} value={c.id}>
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
                  {subCategoriasFiltradas.length > 0
                    ? subCategoriasFiltradas.map((s) => (
                        <ItemComboBox
                          key={s.idDaSubcategoria}
                          value={s.idDaSubcategoria}
                        >
                          {s.nomeDaSubcategoria}
                        </ItemComboBox>
                      ))
                    : null}
                </ComboBox>
              </InputGroup>

              <InputGroup>
                <Label>Tipo de Custo:</Label>
                <ComboBox
                  onChange={handleChange}
                  name="tipoCusto"
                  value={registro.tipoCusto}
                >
                  <ItemComboBox value="">Selecione um Tipo de Custo</ItemComboBox>
                  {custo.map((c) => (
                    <ItemComboBox key={c.id} value={c.id}>
                      {c.nome}
                    </ItemComboBox>
                  ))}
                </ComboBox>
              </InputGroup>

              <InputGroup>
                <Label>Forma Pagamento:</Label>
                <ComboBox
                  onChange={handleChange}
                  name="formaPagamento"
                  value={registro.formaPagamento}
                >
                  <ItemComboBox value="">Selecione uma Forma de Pagamento</ItemComboBox>
                  {formaDePagamento.map((f) => (
                    <ItemComboBox key={f.id} value={f.id}>
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
                Cadastrar
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

export default AdicionarRegistro;

