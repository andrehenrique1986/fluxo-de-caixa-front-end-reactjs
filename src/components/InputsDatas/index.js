import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import BotaoPrincipal from '../BotaoPrincipal';
import AdicionarRegistro from '../Modais/ModalRegistro/AdicionarRegistro';
import { registroActions } from '../../redux/reducers/registroReducer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const Container = styled.div`
  ${tw`flex flex-col gap-4 mt-1 p-4`}
  ${tw`md:gap-6 md:flex-row md:items-start`}
`;

const InputsEBotaoContainer = styled.div`
  ${tw`flex flex-col gap-4 w-full`}
  ${tw`md:flex-row md:gap-6 md:w-full`}
`;

const InputsAndButtonsContainer = styled.div`
  ${tw`flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full`}
`;

const Texto = styled.span`
  ${tw`text-black font-bold`}
  ${tw`md:text-base`}
`;

const InputData = styled.input`
  ${tw`text-black p-2 border-gray-300 border rounded w-full`}
  ${tw`sm:w-auto`}
  ${tw`md:w-48`}
`;

const ButtonsContainer = styled.div`
  ${tw`flex gap-4 items-center`}
  ${tw`md:ml-4`}
`;

const ErrorMessage = styled.div`
  ${tw`text-red-600 font-bold mt-2`}
`;


const InputsDatas = () => {
  const dispatch = useDispatch();
  const [modalAdicionarRegistro, setModalAdicionarRegistro] = useState(false);
  const registros = useSelector(state => state.registroReducer?.registros || []);
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [mensagemErro, setMensagemErro] = useState('');


  const abrirModalAdicionarRegistro = () => setModalAdicionarRegistro(true);
  const fecharModalAdicionarRegistro = () => setModalAdicionarRegistro(false);


  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };


  const handleFiltroData = () => {
    if (!dataInicial || !dataFinal) {
      toast.error("Ambas as datas devem ser preenchidas.");
      return;
    } else if (new Date(dataFinal) < new Date(dataInicial)) {
      toast.error("A data final não pode ser menor que a data inicial.");
      return;
    } else if (new Date(dataInicial) > new Date(dataFinal)) {
      toast.error("A data inicial não pode ser maior que a data final.");
      return;
    }
  
    const filtro = registros.filter(r => {
      const dataRegistro = new Date(r.dtRegistro);
      return (
        (!dataInicial || dataRegistro >= new Date(dataInicial)) &&
        (!dataFinal || dataRegistro <= new Date(dataFinal))
      );
    });
  
    
    if (filtro.length === 0) {
      toast.error("Registros não encontrados.");
      return;
    }
  
    setRegistrosFiltrados(filtro);
  };
  

  
  const clearFilters = () => {
    setDataInicial('');
    setDataFinal('');
    setRegistrosFiltrados(registros); 
  };


  const handleSuccessNovoRegistro = (novoRegistro) => {
    dispatch(registroActions.adicionarRegistroReducer(novoRegistro));
  };

  const handleErrorRegistro = (erro) => {
    toast.error("Erro ao adicionar um novo registro: " + erro.message);
  };

  return (
    <Container>
      <InputsEBotaoContainer>
        <InputsAndButtonsContainer>
          <label>
            <Texto>Data Inicial:</Texto>
            <InputData 
              type="date" 
              value={dataInicial}
              onChange={handleInputChange(setDataInicial)}
              aria-label="Data Inicial"
            />
          </label>
          <label>
            <Texto>Data Final:</Texto>
            <InputData 
              type="date" 
              value={dataFinal}
              onChange={handleInputChange(setDataFinal)}
              aria-label="Data Final"
            />
          </label>
          <ButtonsContainer>
            <BotaoPrincipal onClick={handleFiltroData}>Buscar</BotaoPrincipal>
            <BotaoPrincipal onClick={clearFilters}>Limpar</BotaoPrincipal>
            <BotaoPrincipal onClick={abrirModalAdicionarRegistro}>Novo Registro</BotaoPrincipal>
            <AdicionarRegistro 
              aberto={modalAdicionarRegistro}
              fechado={fecharModalAdicionarRegistro}
              onSuccess={handleSuccessNovoRegistro}
              onError={handleErrorRegistro}
            />
          </ButtonsContainer>
        </InputsAndButtonsContainer>
        {mensagemErro && <ErrorMessage>{mensagemErro}</ErrorMessage>}
      </InputsEBotaoContainer>
    </Container>
  );
};

export default InputsDatas;







