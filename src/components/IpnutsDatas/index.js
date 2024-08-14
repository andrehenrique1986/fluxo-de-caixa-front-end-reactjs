import React from 'react';
import styled from 'styled-components';
import BotaoPrincipal from '../BotaoPrincipal';


const Container = styled.div.attrs({
  className: 'flex flex-col gap-4 mt-1 p-4',
})``;

const InputsEBotaoContainer = styled.div.attrs({
  className: 'flex flex-wrap items-center gap-2',
})``;

const Texto = styled.span.attrs({
  className: 'text-black font-bold',
})``;

const InputData = styled.input.attrs({
  className: 'text-black m-1 p-2 border-gray-300 border-black rounded w-full sm:w-auto',
})``;

const DivInputs = styled.div.attrs({
  className: 'flex flex-wrap items-center gap-2 w-full',
})``;

const DivBotao = styled.div.attrs({
  className: 'w-auto'
})``;

const Espaco = styled.div.attrs({
  className: 'flex-1'
})``;

const InputsDatas = () => {
  //const [modalNovoRegistro, setModalNovoRegistro] = useState(false);


  //const abrirModalRegistro = () => setModalNovoRegistro(true);
  //const fecharModalRegistro = () => setModalNovoRegistro(false);

  return (
    <Container>
      <InputsEBotaoContainer>
        <DivInputs>
          <Texto>Data Inicial:</Texto>
          <InputData type="date" />
          <Texto>Data Final:</Texto>
          <InputData type="date" />
          <BotaoPrincipal>Buscar</BotaoPrincipal>
          <Espaco />
          <DivBotao>
            <BotaoPrincipal>Novo Registro</BotaoPrincipal>
          </DivBotao>
        </DivInputs>
      </InputsEBotaoContainer>
    </Container>
  );
};

export default InputsDatas;

