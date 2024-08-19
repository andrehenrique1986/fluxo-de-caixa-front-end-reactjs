const TypesSubcategoria = {
  ADICIONAR_SUBCATEGORIA_REDUCER: 'ADICIONAR_SUBCATEGORIA_REDUCER',
  CARREGAR_SUBCATEGORIAS_REDUCER: 'CARREGAR_SUBCATEGORIAS_REDUCER',
  CARREGAR_SUBCATEGORIA_POR_ID_REDUCER: 'ARREGAR_SUBCATEGORIA_POR_ID_REDUCER', 
  ATUALIZAR_SUBCATEGORIA_REDUCER: 'ATUALIZAR_SUBCATEGORIA_REDUCER',
  SET_SUBCATEGORIA_SELECIONADA_REDUCER: "SET_SUBCATEGORIA_SELECIONADA_REDUCER",
  EXCLUIR_SUBCATEGORIA_REDUCER: 'EXCLUIR_SUBCATEGORIA_REDUCER',
  ERRO_SUBCATEGORIA_REDUCER: 'ERRO_SUBCATEGORIA_REDUCER'
};

const initialState = {
  subcategorias: [{
     idSubcategoria: null,
     dscSubcategoria: ''
    }],
  subcategoriaPorId: null,
  subcategoriaSelecionada: {}
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
        case TypesSubcategoria.CARREGAR_SUBCATEGORIA_POR_ID_REDUCER:
          return {
            ...state,
            subcategoriaPorId: action.payload
          };
        case TypesSubcategoria.ATUALIZAR_SUBCATEGORIA_REDUCER:
          return {
            ...state,
           subcategorias: state.subcategorias.map((subcategoria) => 
            subcategoria.idSubcategoria === action.payload.idSubcategoria ? action.payload : subcategoria),
           subcategoriaPorId:
          state.subcategoriaPorId && state.subcategoriaPorId.idSubcategoria === action.payload.idSubcategoria
            ? action.payload
            : state.categoriaPorId,
          };
        case TypesSubcategoria.SET_SUBCATEGORIA_SELECIONADA_REDUCER:
          return {
              ...state,
              subcategoriaSelecionada: action.payload
          };
        case TypesSubcategoria.EXCLUIR_SUBCATEGORIA_REDUCER:
          return {
              subcategorias: state.subcategorias.filter(
          (subcategoria) => subcategoria.idSubcategoria !== action.payload
        ),
              subcategoriaPorId:
                state.subcategoriaPorId && state.subcategoriaPorId.id === action.payload
                  ? null
                  : state.subcategoriaPorId,
                }
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
    payload: {
      idSubcategoria: subcategoria.idSubcategoria,
      dscSubcategoria: subcategoria.dscSubcategoria,
      idCategoria: subcategoria.idCategoria,
      dscCategoria: subcategoria.dscCategoria
    }
    
  });
  
  const carregarSubcategoriasReducer = (subcategorias) => ({
    type: TypesSubcategoria.CARREGAR_SUBCATEGORIAS_REDUCER,
    payload: subcategorias
  });


  const carregarSubategoriasPorIdReducer = (subcategoriaPorId) => ({
    type: TypesSubcategoria.CARREGAR_SUBCATEGORIA_POR_ID_REDUCER,
    payload: subcategoriaPorId,
  });
  
  const atualizarSubategoriaReducer = (subcategoria) => ({
    type: TypesSubcategoria.ATUALIZAR_SUBCATEGORIA_REDUCER,
    payload: subcategoria,
  });
  
  const setSubategoriaSelecionadaReducer = (subcategoriaSelecionada) => ({
    type: TypesSubcategoria.SET_SUBCATEGORIA_SELECIONADA_REDUCER,
    payload: subcategoriaSelecionada
  });
  
  const excluirSubcategoriaReducer = (idSubcategoria) => ({
    type: TypesSubcategoria.EXCLUIR_SUBCATEGORIA_REDUCER,
    payload: idSubcategoria,
  });
  
  
  const erroSubcategoriaReducer = (error) => ({
    type: TypesSubcategoria.ERRO_SUBCATEGORIA_REDUCER,
    payload: error
  });
  
  export const subcategoriaActions = {
    adicionarSubategoriaReducer,
    carregarSubcategoriasReducer,
    carregarSubategoriasPorIdReducer,
    atualizarSubategoriaReducer,
    setSubategoriaSelecionadaReducer,
    excluirSubcategoriaReducer,
    erroSubcategoriaReducer
  };

export default subcategoriaReducer;