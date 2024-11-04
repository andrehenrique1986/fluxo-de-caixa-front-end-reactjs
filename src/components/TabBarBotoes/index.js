import React, { useState } from "react";
import styled from "styled-components";
import BotaoPrincipal from "../BotaoPrincipal";
import ModalCategoria from "../Modais/ModalCategoria";
import ModalFormaDePagamento from "../Modais/ModalFormaDePagamento";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  ${tw`bg-[#a1c082] 
       w-auto  
       flex 
       flex-col 
       items-center 
       justify-center 
       mt-1 `
    }
`;

const ListaBotoes = styled.ul`
  ${tw`
       space-y-4 
       text-sm 
       font-medium 
       text-gray-500 
       dark:text-gray-400 
       sm:flex-row 
       sm:p-3 
       `}
`;

const ItemBotoes = styled.li`
  ${tw`flex 
       items-center 
       justify-center 
       w-full 
       sm:flex-1
       md:flex-row
       `}
`;



const TabBarBotoes = () => {
  const navigate = useNavigate();
  const [modalNovaCategoria, setModalNovaCategoria] = useState(false);
  const abrirModalCategoria = () => setModalNovaCategoria(true);
  const fecharModalCategoria = () => setModalNovaCategoria(false);

  const [modalNovaFormaDePagamento, setModalNovaFormaDePagamento] = useState(false);
  const abrirModalFormaDePagamento = () => setModalNovaFormaDePagamento(true);
  const fecharModalFormaDePagamento = () => setModalNovaFormaDePagamento(false);

 

  const handlePainel = () => {
    navigate('/painelPrincipal'); 
  }


  const handleDashboard = () => {
    navigate('/dashboard');
  }

  return (
    <Container>
      <ListaBotoes>
        <ItemBotoes>
          <BotaoPrincipal onClick={handlePainel}>Painel</BotaoPrincipal>
        </ItemBotoes>
        <ItemBotoes>
          <BotaoPrincipal onClick={abrirModalCategoria}>
            Categorias
          </BotaoPrincipal>
          <ModalCategoria
            aberto={modalNovaCategoria}
            fechado={fecharModalCategoria}
          />
        </ItemBotoes>
        <ItemBotoes>
          <BotaoPrincipal onClick={abrirModalFormaDePagamento}>
            Forma Pagamento
          </BotaoPrincipal>
          <ModalFormaDePagamento
            aberto={modalNovaFormaDePagamento}
            fechado={fecharModalFormaDePagamento}
          />
        </ItemBotoes>
        <ItemBotoes>
          <BotaoPrincipal onClick={handleDashboard}>Dashboard</BotaoPrincipal>
        </ItemBotoes>
      </ListaBotoes>
    </Container>
  );
};

export default TabBarBotoes;
