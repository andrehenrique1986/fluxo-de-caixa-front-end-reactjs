const initialState = {
    categorias: []  
  };
  
  // Função reducer
  const categoriaReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'ADICIONAR_CATEGORIA':
        return {
          ...state,
          categorias: [...state.categorias, action.payload]  
        };
      default:
        return state;  
    }
  };
  

export default categoriaReducer;
  