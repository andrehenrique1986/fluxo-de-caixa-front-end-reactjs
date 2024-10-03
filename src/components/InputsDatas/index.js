import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import BotaoPrincipal from '../BotaoPrincipal';
import AdicionarRegistro from '../Modais/ModalRegistro/AdicionarRegistro';
import { registroActions } from '../../redux/reducers/registroReducer';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { filtrarRegistrosPorData, listarRegistro } from '../../api/registroAPI'; 

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
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const abrirModalAdicionarRegistro = () => setModalAdicionarRegistro(true);
  const fecharModalAdicionarRegistro = () => setModalAdicionarRegistro(false);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };


  const handleDataBlur = (setter) => (e) => {
    const inputDate = new Date(e.target.value);
    const today = new Date();

    
    today.setHours(0, 0, 0, 0);
    
    if (inputDate > today) {
      toast.error("A data não pode ser posterior a hoje.");
      setter(''); 
    }
  };

  const handleFiltroData = async (e) => {
    e.preventDefault();

    if (!dataInicial || !dataFinal) {
      toast.error("Ambas as datas devem ser preenchidas.");
      return;
    } else if (new Date(dataFinal) < new Date(dataInicial)) {
      toast.error("A data final não pode ser menor que a data inicial.");
      limparCampos();
      return;
    } else if (new Date(dataInicial) > new Date(dataFinal)){
      toast.error("A data inicial não pode ser maior que a data inicial.");
      limparCampos();
      return;
    }

    const filtro = {
      dataInicial: new Date(dataInicial), 
      dataFinal: new Date(dataFinal),
    };

    try {
      const registrosFiltrados = await filtrarRegistrosPorData(filtro);
      if (registrosFiltrados.length === 0){
        toast.error("Registro(s) não encontrado(s)");
        limparCampos();
      } else {
        dispatch(registroActions.filtrarRegistrosPorDataReducer(registrosFiltrados));
        setMensagemErro(''); 
      }
    } catch (error) {
      toast.error("Erro ao filtrar registros: " + error.message);
    }
  };

  const limparCampos = () => {
    setDataInicial('');
    setDataFinal('');
  }

  const limparFiltro = async (e) => {
    e.preventDefault();
      try {
        if (dataInicial && dataFinal){
          const todosRegistros = await listarRegistro();
          limparCampos();
          dispatch(registroActions.carregarRegistrosReducer(todosRegistros));
          dispatch(registroActions.filtrarRegistrosPorDataReducer([]));
          toast.success("Todos os registros carregados.");
        }
      } catch (error) {
        toast.error("Erro ao carregar os registros");
      }
  };

  const handleSuccessNovoRegistro = (novoRegistro) => {
    dispatch(registroActions.adicionarRegistroReducer(novoRegistro));
  };

  const handleErrorRegistro = (erro) => {
    toast.error("Erro ao adicionar um novo registro: " + erro.message);
  };

  const dataHoje = () => {
    return new Date().toISOString().split('T')[0];
  }

  

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
              onBlur={handleDataBlur(setDataInicial)}
              aria-label="Data Inicial"
              max={dataHoje()}
            />
          </label>
          <label>
            <Texto>Data Final:</Texto>
            <InputData 
              type="date" 
              value={dataFinal}
              onChange={handleInputChange(setDataFinal)}
              onBlur={handleDataBlur(setDataFinal)}
              aria-label="Data Final"
              max={dataHoje()}
              
            />
          </label>
          <ButtonsContainer>
            <BotaoPrincipal 
            onClick={handleFiltroData}
            dataInicial={dataInicial}
            dataFinal={dataFinal}
            >Buscar</BotaoPrincipal>
            <BotaoPrincipal 
            onClick={limparFiltro}
            limparFiltro={limparFiltro}
            >
            Limpar</BotaoPrincipal>
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








