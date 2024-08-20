import React, { useState } from "react";
import styled from "styled-components";
import BotaoPrincipal from "../BotaoPrincipal";
import ModalCategoria from "../Modais/ModalCategoria";
import ModalFormaDePagamento from "../Modais/ModalFormaDePagamento";

const Container = styled.div.attrs({
  className: `bg-[#a1c082] 
                w-1/12 
                h-screen 
                flex 
                flex-col 
                items-center 
                justify-center 
                mt-1`,
})``;

const ListaBotoes = styled.ul.attrs({
  className: `space-y-4 
                text-sm 
                font-medium 
                text-gray-500 
                dark:text-gray-400 
                w-full`,
})``;

const ItemBotoes = styled.li.attrs({
  className: `w-full 
                flex 
                items-center 
                justify-center`,
})``;

const TabBarBotoes = () => {
  const [modalNovaCategoria, setModalNovaCategoria] = useState(false);
  const abrirModalCategoria = () => setModalNovaCategoria(true);
  const fecharModalCategoria = () => setModalNovaCategoria(false);

  return (
    <Container>
      <ListaBotoes>
        <ItemBotoes>
          <BotaoPrincipal>Painel</BotaoPrincipal>
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
          <BotaoPrincipal>Forma Pagamento</BotaoPrincipal>
        </ItemBotoes>
        <ItemBotoes>
          <BotaoPrincipal>Dashboard</BotaoPrincipal>
        </ItemBotoes>
      </ListaBotoes>
    </Container>
  );
};

export default TabBarBotoes;
