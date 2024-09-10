import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import InputMask from 'react-input-mask';
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { adicionarRegistro } from "../../../../api/registroAPI";
import { listarCategoria } from "../../../../api/categoriaAPI";
import { listarSubcategoria } from "../../../../api/subcategoriaAPI";
import { listarFormaDePagamento } from "../../../../api/formaDePagamentoAPI";
import { listarCusto } from "../../../../api/custoAPI";
import { listarFluxo } from "../../../../api/fluxoAPI";
import BotaoPrincipal from "../../../BotaoPrincipal";

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

const TituloModal = styled.h2`
  ${tw`text-center text-lg font-bold mb-2 text-black`}
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
  ${tw`border-2 border-custom-blue p-2 rounded w-1/2 text-black`}
`;


const ComboBox = styled.select`
  ${tw`border-2 border-custom-blue p-2 rounded w-1/2 text-black`}
`;


const ItemComboBox = styled.option`
`;

const BotaoContainer = styled.div`
  ${tw`flex justify-center items-center space-x-4 mt-4`}
`;

const AdicionarRegistro = ({ aberto, fechado }) => {
  const dispatch = useDispatch();
  const [categoria, setCategoria] = useState([]);
  const subcategorias = useSelector(state => state.subcategorias);
  const [subcategoria, setSubcategoria] = useState(subcategorias);
  const [formaDePagamento, setFormaDePagamento] = useState([]);
  const [fluxo, setFluxo] = useState([]);
  const [custo, setCusto] = useState([]);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [subCategoriaSelecionada, setSubCategoriaSelecionada] = useState('');
  const [registro, setRegistro] = useState({
    idRegistro: null,
    dtRegistro: '',
    fluxo: '',
    categoria: '',
    subCategoria: '',
    tipoCusto: '',
    formaPagamento: '',
    valor: ''
  });

  useEffect(() => {
    if (aberto) {
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
        custoData
      ] = await Promise.all([
        listarFluxo(),
        listarCategoria(),
        listarSubcategoria(),
        listarFormaDePagamento(),
        listarCusto()
      ]);
      setFluxo(fluxoData);
      setCategoria(categoriaData);
      setSubcategoria(subcategoriaData);
      setFormaDePagamento(formaDePagamentoData);
      setCusto(custoData);
      console.log('Fluxo:', fluxoData);
      console.log('Categoria:', categoriaData);
      console.log('Subcategoria:', subcategoriaData);
      console.log('Forma de Pagamento:', formaDePagamentoData);
      console.log('Custo:', custoData);
    } catch (error) {
      toast.error("Erro ao carregar os dados: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistro(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCategoriaChange = (e) => {
    const valorSelecionado = e.target.value;
    setCategoriaSelecionada(valorSelecionado);
    setRegistro(prevState => ({
      ...prevState,
      categoria: valorSelecionado,
      subCategoria: '' 
    }));
  };

  const handleSubCategoriaChange = (e) => {
    const valorSelecionado = e.target.value;
    setSubCategoriaSelecionada(valorSelecionado);
    setRegistro(prevState => ({
     ...prevState,
     subCategoria: valorSelecionado
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { dtRegistro, valor } = registro;

    if (!dtRegistro || !valor) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await dispatch(adicionarRegistro({
        dtRegistro: registro.dtRegistro,
        fluxo: registro.fluxo,
        categoria: registro.categoria,
        subCategoria: registro.subCategoria,
        tipoCusto: registro.tipoCusto,
        formaPagamento: registro.formaPagamento,
        valor: registro.valor.replace("R$ ", "").replace(".", "").replace(",", ".")
      }));

      toast.success("Registro cadastrado com sucesso!");
      setRegistro({
        idRegistro: null,
        dtRegistro: '',
        fluxo: '',
        categoria: '',
        subCategoria: '',
        tipoCusto: '',
        formaPagamento: '',
        valor: ''
      });
     
      fechado();
    } catch (error) {
      toast.error("Erro ao cadastrar o registro: " + error.message);
    }
  };

  const subcategoriasFiltradas = categoriaSelecionada
  ? subcategoria.filter(sub => sub.idCategoria === categoriaSelecionada)
  : [];

  console.log(categoriaSelecionada);
  console.log(subcategoriasFiltradas);
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
                <Label>Data:</Label>
                <Input
                  type="date"
                  name="dtRegistro"
                  value={registro.dtRegistro}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <Label>Tipo de Fluxo:</Label>
                <ComboBox
                  onChange={handleChange}
                  name="fluxo"
                  value={registro.fluxo}
                >
                  <ItemComboBox value="">Selecione um Tipo de Fluxo</ItemComboBox>
                  {fluxo.map(f => (
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
                    {categoria.map(c => (
                    <ItemComboBox 
                    key={c.id} 
                    value={c.id}
                    >
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
                    {subcategoriasFiltradas.length > 0 ? (
                        subcategoriasFiltradas.map(s => (
                            <ItemComboBox key={s.idDaSubcategoria} value={s.idDaSubcategoria}>
                                {s.nomeDaSubcategoria}
                            </ItemComboBox>
                        ))
                    ) : null }
                </ComboBox>
            </InputGroup>
                    
              <InputGroup>
                <Label>Tipo Custo:</Label>
                <ComboBox
                  onChange={handleChange}
                  name="tipoCusto"
                  value={registro.tipoCusto}
                >
                  <ItemComboBox value="">Selecione um Tipo de Custo</ItemComboBox>
                  {custo.map(c => (
                    <ItemComboBox 
                    key={c.id} 
                    value={c.id}
                    >
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
                  {
                    formaDePagamento.map(f => (
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
                  mask="R$ 999.999.999,99"
                  className="border-2 border-custom-blue p-2 rounded w-1/2 text-black"
                  value={registro.valor}
                  onChange={handleChange}
                />
              </InputGroup>

            </InputsContainer>
            <BotaoContainer>
              <BotaoPrincipal type="submit" className="px-6 py-3 text-base font-medium">
                Cadastrar
              </BotaoPrincipal>
              <BotaoPrincipal
                type="button"
                className="px-6 py-3 text-base font-medium"
                onClick={() => setRegistro({
                  idRegistro: null,
                  dtRegistro: '',
                  fluxo: '',
                  categoria: '',
                  subCategoria: '',
                  tipoCusto: '',
                  formaPagamento: '',
                  valor: ''
                })}
              >
                Limpar
              </BotaoPrincipal>
            </BotaoContainer>
          </Formulario>
        </ConteudoModal>
      </SobreposicaoModal>
      <ToastContainer />
    </>
  );
};

export default AdicionarRegistro;




