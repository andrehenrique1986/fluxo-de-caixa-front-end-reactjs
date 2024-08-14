const TypesCategoria = {
  ADICIONAR_CATEGORIA: 'ADICIONAR_CATEGORIA',
  CARREGAR_CATEGORIAS: 'CARREGAR_CATEGORIAS',
  CARREGAR_NOME_SUBCATEGORIAS: 'CARREGAR_NOME_SUBCATEGORIAS',
  ERRO_CATEGORIA: 'ERRO_CATEGORIA'
};

const initialState = {
  categorias: [],
  nomeSubcategorias: [],
  error: null  
};
  
 
  const categoriaReducer = (state = initialState, action) => {
    switch(action.type) {
      case TypesCategoria.ADICIONAR_CATEGORIA:
        return {
          ...state,
          categorias: [...state.categorias, action.payload] 
        }
      case TypesCategoria.CARREGAR_CATEGORIAS:
        return {
          ...state,
          categorias: action.payload
        }
      case TypesCategoria.CARREGAR_NOME_SUBCATEGORIAS:
        return {
          ...state,
          nomeSubcategorias: action.payload
        }
      case TypesCategoria.ERRO_CATEGORIA:
        return {
          ...state,
          error: action.payload
        }
      default:
        return state;  
    }
  };
  
 

  export const adicionarCategoria = (categoria) => ({
    type: TypesCategoria.ADICIONAR_CATEGORIA,
    payload: categoria
  });
  
   const carregarCategorias = (categorias) => ({
    type: TypesCategoria.CARREGAR_CATEGORIAS,
    payload: categorias
  });
  
  const carregarNomeSubcategorias = (nomeSubcategorias) => ({
    type: TypesCategoria.CARREGAR_NOME_SUBCATEGORIAS,
    payload: nomeSubcategorias
  })

  const erroCategoria = (error) => ({
    type: TypesCategoria.ERRO_CATEGORIA,
    payload: error
  });

  export const categoriaActions = {
    adicionarCategoria,
    carregarCategorias,
    carregarNomeSubcategorias,
    erroCategoria
  };

export default categoriaReducer;
  