import React from 'react';
import ListaCategorias from './ListaCategorias'; 
import styled from 'styled-components';
import tw from 'twin.macro';

const SobreposicaoModal = styled.div`
    ${tw`fixed 
         inset-0 
         flex 
         items-center 
         justify-center 
         z-50 
         bg-black 
         bg-opacity-50`
         }
`;

const ConteudoModal = styled.div`
    ${tw`bg-white 
         rounded-lg 
         shadow-lg 
         max-w-full 
         sm:max-w-4xl 
         w-full 
         relative 
         p-6 
         text-black`
         }
`;

const BotaoFechar = styled.button`
    ${tw`absolute 
         top-2 
         right-2 
         text-gray-500 
         hover:text-gray-700`
         }
`;

const ContainerListas = styled.div`
    ${tw`flex 
         flex-col 
         md:flex-row 
         justify-center 
         space-y-4 
         md:space-y-0 
         md:space-x-5`
         }
`;

const ModalCategoria = ({ aberto, fechado }) => {
    if (!aberto) return null;

    return (
        <SobreposicaoModal>
            <ConteudoModal>
                <BotaoFechar onClick={fechado}>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </BotaoFechar>
                <ContainerListas>
                    <ListaCategorias/>
                </ContainerListas>
            </ConteudoModal>
        </SobreposicaoModal>
    );
};

export default ModalCategoria;



