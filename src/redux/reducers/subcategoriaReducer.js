const TypesSubcategoria = {
  ADICIONAR_SUBCATEGORIA: 'ADICIONAR_SUBCATEGORIA',
  CARREGAR_SUBCATEGORIAS: 'CARREGAR_SUBCATEGORIAS',
  ERRO_SUBCATEGORIA: 'ERRO_SUBCATEGORIA'
};

const initialState = {
  subcategorias: [],
  error: null  
};
  const subcategoriaReducer = (state = initialState, action) => {
    switch(action.type) {
      case TypesSubcategoria.ADICIONAR_SUBCATEGORIA:
        return {
          ...state,
          subcategorias: [...state.subcategorias, action.payload]  
        };
        case TypesSubcategoria.CARREGAR_SUBCATEGORIAS:
            return {
                ...state,
                subcategorias: action.payload
            };
        case TypesSubcategoria.ERRO_SUBCATEGORIA:
            return {
                ...state,
                error: action.payload
            }
      default:
        return state;  
    }
  };

  

  const adicionarSubategoria = (subcategoria) => ({
    type: TypesSubcategoria.ADICIONAR_SUBCATEGORIA,
    payload: subcategoria
  });
  
  const carregarSubcategorias = (subcategorias) => ({
    type: TypesSubcategoria.CARREGAR_SUBCATEGORIAS,
    payload: subcategorias
  });
  
  const erroSubcategoria = (error) => ({
    type: TypesSubcategoria.ERRO_SUBCATEGORIA,
    payload: error
  });
  
  export const subcategoriaActions = {
    adicionarSubategoria,
    carregarSubcategorias,
    erroSubcategoria
  };

export default subcategoriaReducer;