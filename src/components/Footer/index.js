import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import linkedinImg from '../../assets/images/linkedin.png';
import githubImg from '../../assets/images/github.png';


const Rodape = styled.footer`
    ${tw`bg-center 
         bg-[#80ae51] 
         mt-1`
         }
`
const Container = styled.div`
  ${tw`
    text-white 
    flex 
    flex-col 
    items-center 
    justify-center 
    p-5
  `}
`;

const Titulos = styled.div`
     ${tw`
     text-center 
     mb-5
     `}
`;


const TituloPrincipal = styled.h1`
`;

const TituloSecundario = styled.h2`
`;

const Negrito = styled.b`
    ${tw`
     font-bold
     `}
`;

const RedesSociais = styled.div`
    ${tw`
     flex
     flex-1
     `}
`;

const TituloRedes = styled.h1`
    padding-left: 5px;
`;

const ImagensRedes = styled.img`
   ${tw`
    w-6 
    p-1
   `}
`;

const Footer = () => {
    return(
        <Rodape>
            <Container>
            <Titulos>
            <TituloPrincipal>Projeto desenvolvido para fins de estudo</TituloPrincipal>
            <TituloSecundario>Feito por: <Negrito>Dev. André Henrique Lima</Negrito></TituloSecundario>
            </Titulos>
            <RedesSociais>
                <TituloRedes className="mr-4 justify-between">Redes: </TituloRedes>
                <Link to="https://www.linkedin.com/in/andre-henrique-silva-lima-pcd-394369103/"><ImagensRedes src={linkedinImg} alt="LinkedIn"/></Link>
                <Link to="https://github.com/andrehenrique1986/"><ImagensRedes src={githubImg} alt="GitHub"/></Link>
            </RedesSociais>
            </Container>
        </Rodape>
    )
}

export default Footer;