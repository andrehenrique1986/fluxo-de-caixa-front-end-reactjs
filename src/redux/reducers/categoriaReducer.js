const initialState = {
    categorias: [],
    subcategorias: [],
    error: null  
  };
  
  // Função reducer
  const categoriaReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'ADICIONAR_CATEGORIA':
        return {
          ...state,
          categorias: [...state.categorias, action.payload], 
        };
        case 'CARREGAR_CATEGORIAS':
            return {
                ...state,
                categorias: action.payload,
            };
        case 'CARREGAR_SUBCATEGORIAS':
            return {
                ...state,
                subcategorias: action.payload
            }
        case 'ERRO_CATEGORIA':
            return {
                ...state,
                error: action.payload
            }
      default:
        return state;  
    }
  };
  

export default categoriaReducer;
  