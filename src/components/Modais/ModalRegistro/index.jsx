import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs({
  className: 'fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-black'
})``;

const ModalContainer = styled.div.attrs({
  className: 'bg-white rounded-lg p-6 max-w-lg w-full shadow-lg relative w-full h-full'
})``;


const ModalRegistro = ({ aberto, fechado }) => {

    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const adicionarRegistros = async() => {
            try {
                const response = await fetch('https://localhost:44395/Registro/api/adicionarRegistro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok){
                    throw new Error('Erro ao buscar os dados da API');
                }

                const dados = await response.json();
                setRegistros(dados);
            } catch (erro) {
                setErro(erro);
            } finally {
                setCarregando(false);
            }
        }

        adicionarRegistros();
        
    },[]);

   

  if (!aberto) return null;

  return (
    <Container onClick={fechado}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
      <form>
        <input/>
      </form>
      </ModalContainer>
    </Container>
  );
};

export default ModalRegistro;
