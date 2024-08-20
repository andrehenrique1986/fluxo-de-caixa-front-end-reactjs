import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { listarFormaDePagamento } from "../../../../api/formaDePagamentoAPI";
import { formaDePagamentoActions } from "../../../../redux/reducers/formaDePagamentoReducer";
import BotaoPrincipal from "../../../BotaoPrincipal";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ContainerPrincipal = styled.div`
  ${tw`flex 
       items-center 
       justify-center 
       p-4`}
`;

const Container = styled.div`
  ${tw`flex 
       flex-col 
       p-0 
       bg-white 
       rounded-lg 
       shadow-md 
       items-center 
       text-black 
       w-96 
       h-auto`}
`;

const Lista = styled.ul`
  ${tw`list-none 
       p-0 
       m-0 
       text-black
       items-center
       border-2 
       border-custom-blue 
       overflow-y-auto`}
  max-height: 300px;
`;

const DivErro = styled.div`
  ${tw`text-red-600 
       font-bold`}
`;

const ContainerLista = styled.div`
  ${tw`flex 
       w-full 
       justify-center
       space-y-0
       bg-blue-200 
       border-2 
       border-custom-blue`}
`;

const Item = styled.li`
  ${tw`py-2 
       px-4 
       cursor-pointer 
       border-0`}
  ${({ isSelected }) => isSelected ? 
                                  tw`bg-blue-400 
                                     text-white` 
                                  :
                                  tw`bg-gray-100 
                                     hover:bg-blue-400 
                                     hover:text-white`}
  ${({ isSelected }) => !isSelected && tw`text-black`}
`;

const ListaContainer = styled.div`
  ${tw`w-1/2 
       p-4 
       flex 
       flex-col
       justify-center
       `}
`;

const BotaoContainerPrincipal = styled.div`
  ${tw`flex 
       flex-col 
       items-center 
       space-y-2 
       w-full 
       p-4`}
`;


const ListaFormaDePagamento = () => {

    const dispatch = useDispatch();
    const formasDePagamento = useSelector(state => state.formasDePagamento.formasDePagamento);

    const [formaDePagamentoSelecionada, setFormaDePagamentoSelecionada] = useState(null);
    const [formaDePagamentoSelecionadaClick , setFormaDePagamentoSelecionadaClick] = useState(null);

    useEffect(() => {
        const fetchFormaDePagamento = async () => {
            try {
                const data = await listarFormaDePagamento();
                dispatch(formaDePagamentoActions.carregarFormaDePagamentoReducer(data)); 
            } catch (error) {
                console.error("Erro ao carregar as formas de pagamento:", error);
                dispatch(formaDePagamentoActions.erroFormaDePagamentoReducer(
                    "Erro ao carregar as formas de pagamento: " + error.message
                ))
            }
        }

        setFormaDePagamentoSelecionada(formasDePagamento.formaDePagamentoSelecionada);
        fetchFormaDePagamento();
    }, [dispatch]);

    return(
        <ContainerPrincipal>
            <Container>
            <ContainerLista>
                <ListaContainer>
                    <Lista>
                        {formasDePagamento.length > 0 ? (
                            formasDePagamento.map((formaDePagamento) => (
                                <Item
                                key={formaDePagamento.id}
                                isSelected={formaDePagamento?.nome === formaDePagamentoSelecionadaClick}
                                onClick={() => {
                                    setFormaDePagamentoSelecionada(formaDePagamento);
                                    dispatch(formaDePagamentoActions.setFormaDePagamentoSelecionadaReducer(formaDePagamento));
                                    setFormaDePagamentoSelecionadaClick(formaDePagamento.nome); 
                                }}
                                >
                                    {formaDePagamento.id} - {formaDePagamento.nome}
                                </Item>
                            ))
                        ) : (
                            <Item>Não há formas de pagamento disponíveis.</Item>
                        )
                        }
                    </Lista>
                </ListaContainer>
            </ContainerLista>
            <BotaoContainerPrincipal>
                <BotaoPrincipal>Adicionar Forma de Pagamento</BotaoPrincipal>
                <BotaoPrincipal>Atualizar Forma de Pagamento</BotaoPrincipal>
                <BotaoPrincipal>Excluir Forma de Pagamento</BotaoPrincipal>
            </BotaoContainerPrincipal>
            <ToastContainer />
        </Container>
        </ContainerPrincipal>
        
    )
}


export default ListaFormaDePagamento;