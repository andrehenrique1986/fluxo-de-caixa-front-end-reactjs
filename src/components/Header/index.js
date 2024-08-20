import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Cabacalho = styled.header`
  ${tw`bg-center 
       bg-[#80ae51] 
       p-3.5 
       text-center`
        }
`;

const TextoPrincipal = styled.h1`
  ${tw`text-white 
       text-5xl 
       font-bold`
       }
`;


const Header = () => {
  return (
    <Cabacalho>
      <TextoPrincipal>Fluxo de Caixa</TextoPrincipal>
    </Cabacalho>
  );
};

export default Header;
