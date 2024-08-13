import React from "react";
import styled from "styled-components";

const Rodape = styled.footer.attrs({
    className: `bg-center 
                bg-[#80ae51] 
                mt-1`
})``;

const Footer = () => {
    return(
        <Rodape>
            <h1>Olá !!!!!</h1>
        </Rodape>
    )
}

export default Footer;