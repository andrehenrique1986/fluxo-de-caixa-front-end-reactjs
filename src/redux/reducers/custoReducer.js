const TypesCusto = {
    
    CARREGAR_CUSTOS_REDUCER: 'CARREGAR_CUSTOS_REDUCER',
    CARREGAR_CUSTOS_POR_ID_REDUCER: 'CARREGAR_CUSTOS_POR_ID_REDUCER', 
    
  };
  
  const initialState = {
    custos: [],  
    custoPorId: null,
    error: null
  };
  
  const custoReducer = (state = initialState, action) => {
    switch(action.type) {
      
        
      case TypesCusto.CARREGAR_CUSTOS_REDUCER:
        return {
          ...state,
          custos: action.payload
        };
  
      case TypesCusto.CARREGAR_CUSTOS_POR_ID_REDUCER:
        return {
          ...state,
          fluxoPorId: action.payload
        };
        
    
      default:
        return state;
    }
  };
  

  
  const carregarCustosReducer = (custos) => ({
    type: TypesCusto.CARREGAR_CUSTOS_REDUCER,
    payload: custos
  });
  
  const carregarCustoPorIdReducer = (custoPorId) => ({
    type: TypesCusto.CARREGAR_CUSTOS_POR_ID_REDUCER,
    payload: custoPorId
  });
  
  
  
  export const subcategoriaActions = {
    carregarCustosReducer,
    carregarCustoPorIdReducer,
  };
  
  export default custoReducer;