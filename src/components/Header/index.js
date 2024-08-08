import React from "react";
import styled from "styled-components";

const Cabacalho = styled.header`
    background-color: gray;
    padding: 1rem; 
    
    text-align: center;
`;

const TextoPrincipal = styled.h1`
    font-size: 45px;
    color: #FFFFFF ; 
`;

const Header = () => {
    return (
        <Cabacalho>
            <TextoPrincipal>Fluxo de Caixa</TextoPrincipal>
        </Cabacalho>
    );
}

export default Header;