const TypesFluxo = {
    
    CARREGAR_FLUXOS_REDUCER: 'CARREGAR_FLUXOS_REDUCER',
    CARREGAR_FLUXO_POR_ID_REDUCER: 'CARREGAR_FLUXO_POR_ID_REDUCER', 
    
  };
  
  const initialState = {
    fluxos: [],  
    fluxoPorId: null,
    error: null
  };
  
  const fluxoReducer = (state = initialState, action) => {
    switch(action.type) {
      
        
      case TypesFluxo.CARREGAR_FLUXOS_REDUCER:
        return {
          ...state,
          fluxos: action.payload
        };
  
      case TypesFluxo.CARREGAR_FLUXO_POR_ID_REDUCER:
        return {
          ...state,
          fluxoPorId: action.payload
        };
        
    
      default:
        return state;
    }
  };
  

  
  const carregarFluxosReducer = (fluxos) => ({
    type: TypesFluxo.CARREGAR_FLUXOS_REDUCER,
    payload: fluxos
  });
  
  const carregarFluxoPorIdReducer = (fluxoPorId) => ({
    type: TypesFluxo.CARREGAR_FLUXOS_POR_ID_REDUCER,
    payload: fluxoPorId
  });
  
  
  
  export const subcategoriaActions = {
    carregarFluxosReducer,
    carregarFluxoPorIdReducer,
  };
  
  export default fluxoReducer;