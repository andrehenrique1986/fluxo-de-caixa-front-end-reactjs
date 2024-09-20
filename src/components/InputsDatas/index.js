import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import BotaoPrincipal from '../BotaoPrincipal';
import AdicionarRegistro from '../Modais/ModalRegistro/AdicionarRegistro';
import { registroActions } from '../../redux/reducers/registroReducer';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';



const Container = styled.div`
  ${tw`flex 
       flex-col 
       gap-4 
       mt-1 
       p-4`
       }
  ${tw`md:gap-6 
       md:flex-row 
       md:items-start`
       }
`;

const InputsEBotaoContainer = styled.div`
  ${tw`flex 
       flex-col 
       gap-4 
       w-full`
       }
  ${tw`md:flex-row 
       md:gap-6 md:w-full`
       }
`;

const InputsAndButtonsContainer = styled.div`
  ${tw`flex 
       flex-col 
       md:flex-row 
       items-center 
       gap-4 
       md:gap-6 w-full`
       }
`;

const Texto = styled.span`
  ${tw`text-black 
       font-bold`
       }
  ${tw`md:text-base`}
`;

const InputData = styled.input`
  ${tw`text-black 
       p-2 
       border-gray-300 
       border 
       rounded 
       w-full`
       }
  ${tw`sm:w-auto`}
  ${tw`md:w-48`} 
`;

const ButtonsContainer = styled.div`
  ${tw`flex 
       gap-4 
       items-center`
       }
  ${tw`md:ml-4`}
`;

const InputsDatas = () => {

  const dispatch = useDispatch();  
  const [modalAdicionarRegistro, setModalAdicionarRegistro] = useState(false);
  const [registro, setRegistro] = useState({
    idRegistro: null,
    dtRegistro: "",
    tipoFluxo: "",
    categoria: "",
    subCategoria: "",
    tipoCusto: "",
    formaPagamento: "",
    valor: "",
  });

   const abrirModalAdicionarRegistro = () => setModalAdicionarRegistro(true);
   const fecharModalAdicionarRegistro = () => setModalAdicionarRegistro(false);


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
          <Texto>Data Inicial:</Texto>
          <InputData type="date" />
          <Texto>Data Final:</Texto>
          <InputData type="date" />
          <ButtonsContainer>
            <BotaoPrincipal>Buscar</BotaoPrincipal>
            <BotaoPrincipal onClick={abrirModalAdicionarRegistro}>Novo Registro</BotaoPrincipal>
            <AdicionarRegistro 
            aberto={modalAdicionarRegistro}
            fechado={fecharModalAdicionarRegistro} 
            limparRegistros={limparRegistros}
            onSuccess={handleSuccessNovoRegistro}
            onError={handleErrorRegistro}
            />
          </ButtonsContainer>
        </InputsAndButtonsContainer>
      </InputsEBotaoContainer>
    </Container>
  );
};

export default InputsDatas;



