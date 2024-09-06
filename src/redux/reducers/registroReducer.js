const TypesRegistro = {
    ADICIONAR_REGISTRO_REDUCER: 'ADICIONAR_REGISTRO_REDUCER',
    CARREGAR_REGISTRO_REDUCER: 'CARREGAR_REGISTRO_REDUCER',
    CARREGAR_REGISTRO_POR_ID_REDUCER: 'CARREGAR_REGISTRO_POR_ID_REDUCER', 
    ATUALIZAR_REGISTRO_REDUCER: 'ATUALIZAR_REGISTRO_REDUCER',
    EXCLUIR_REGISTRO_REDUCER: 'EXCLUIR_REGISTRO_REDUCER',
    CALC_GASTOS_POR_CATEGORIA_REDUCER: 'CALC_GASTOS_POR_CATEGORIA_REDUCER',
    CALC_REGISTRO_POR_FORMA_PGTO_REDUCER: 'CALC_REGISTRO_POR_FORMA_PGTO_REDUCER',
    CALC_PORCENTAGEM_POR_CUSTO_REDUCER: 'CALC_PORCENTAGEM_POR_CUSTO_REDUCER',
    CALC_REGISTRO_POR_FLUXC_REDUCER: 'CALC_REGISTRO_POR_FLUXC_REDUCER',  
    ERRO_REGISTRO_REDUCER: 'ERRO_REGISTRO_REDUCER'
  };


  const initialState = {
    registros: [],
    error: null,
    registroPorId: null
};


const registroReducer = (state = initialState, action) => {
    switch (action.type){
        case TypesRegistro.ADICIONAR_REGISTRO_REDUCER:
            return {
                ...state,
                registros: [...state.registros, action.payload],
            };
            case TypesRegistro.CARREGAR_REGISTRO_REDUCER:
                return {
                  ...state,
                  registros: action.payload,
                };
              case TypesRegistro.CARREGAR_REGISTRO_POR_ID_REDUCER:
                return {
                  ...state,
                  registroPorId: action.payload,
                };
            default:
                return state;
    }
    

}
