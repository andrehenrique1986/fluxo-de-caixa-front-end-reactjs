const TypesSubcategoria = {
  ADICIONAR_SUBCATEGORIA_REDUCER: 'ADICIONAR_SUBCATEGORIA_REDUCER',
  CARREGAR_SUBCATEGORIAS_REDUCER: 'CARREGAR_SUBCATEGORIAS_REDUCER',
  CARREGAR_SUBCATEGORIA_POR_ID_REDUCER: 'ARREGAR_SUBCATEGORIA_POR_ID_REDUCER', 
  ATUALIZAR_SUBCATEGORIA_REDUCER: 'ATUALIZAR_SUBCATEGORIA_REDUCER',
  EXCLUIR_SUBCATEGORIA_REDUCER: 'EXCLUIR_SUBCATEGORIA_REDUCER',
  ERRO_SUBCATEGORIA_REDUCER: 'ERRO_SUBCATEGORIA_REDUCER'
};

const initialState = {
  subcategorias: null,
  subcategoriaPorId: null,
  error: null  
};
  const subcategoriaReducer = (state = initialState, action) => {
    switch(action.type) {
      case TypesSubcategoria.ADICIONAR_SUBCATEGORIA_REDUCER:
        return {
          ...state,
          subcategorias: [...state.subcategorias, action.payload]  
        };
        case TypesSubcategoria.CARREGAR_SUBCATEGORIAS_REDUCER:
            return {
                ...state,
                subcategorias: action.payload
            };
        case TypesSubcategoria.ERRO_SUBCATEGORIA_REDUCER:
            return {
                ...state,
                error: action.payload
            }
      default:
        return state;  
    }
  };

  

  const adicionarSubategoriaReducer = (subcategoria) => ({
    type: TypesSubcategoria.ADICIONAR_SUBCATEGORIA_REDUCER,
    payload: subcategoria
  });
  
  const carregarSubcategoriasReducer = (subcategorias) => ({
    type: TypesSubcategoria.CARREGAR_SUBCATEGORIAS_REDUCER,
    payload: subcategorias
  });
  
  const erroSubcategoriaReducer = (error) => ({
    type: TypesSubcategoria.ERRO_SUBCATEGORIA_REDUCER,
    payload: error
  });
  
  export const subcategoriaActions = {
    adicionarSubategoriaReducer,
    carregarSubcategoriasReducer,
    erroSubcategoriaReducer
  };

export default subcategoriaReducer;