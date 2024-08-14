const initialState = {
    subcategorias: [] ,
    error: null
  };
  
  
  const subcategoriaReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'ADICIONAR_SUBCATEGORIA':
        return {
          ...state,
          subcategorias: [...state.subcategorias, action.payload]  
        };
        case 'CARREGAR_SUBCATEGORIAS':
            return {
                ...state,
                subcategorias: [...state.subcategorias, action.payload]
            };
        case 'ERRO_SUBCATEGORIA':
            return {
                ...state,
                error: action.payload
            }
      default:
        return state;  
    }
  };
  

export default subcategoriaReducer;