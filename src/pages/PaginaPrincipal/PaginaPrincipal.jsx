import React from "react"
import Header from "../../components/Header";
import TituloPrincipal from "../../components/TituloPrincipal";
import InputsEBotao from "../../components/InputsEBotao";
import TabBarBotoes from "../../components/TabBarBotoes";
import Footer from "../../components/Footer";

const PaginaPrincipal = () => {
    return(
        <>
        <Header />
        <TituloPrincipal/>
        <InputsEBotao/>
        <TabBarBotoes />
        <Footer/>
        </>
    )
}

export default PaginaPrincipal;