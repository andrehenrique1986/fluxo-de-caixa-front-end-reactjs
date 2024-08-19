const TypesCategoria = {
  ADICIONAR_CATEGORIA_REDUCER: "ADICIONAR_CATEGORIA_REDUCER",
  CARREGAR_CATEGORIAS_REDUCER: "CARREGAR_CATEGORIAS_REDUCER",
  CARREGAR_CATEGORIA_POR_ID_REDUCER: "CARREGAR_CATEGORIA_POR_ID_REDUCER",
  CARREGAR_NOME_SUBCATEGORIAS_REDUCER: "CARREGAR_NOME_SUBCATEGORIAS_REDUCER",
  ATUALIZAR_CATEGORIA_REDUCER: "ATUALIZAR_CATEGORIA_REDUCER",
  SET_CATEGORIA_SELECIONADA_REDUCER: "SET_CATEGORIA_SELECIONADA_REDUCER",
  EXCLUIR_CATEGORIA_REDUCER: "EXCLUIR_CATEGORIA_REDUCER",
  ERRO_CATEGORIA_REDUCER: "ERRO_CATEGORIA_REDUCER",
};

const initialState = {
  categorias: [{
    idCategoria: 0,
    dscCategoria: ''
  }],
  nomeSubcategorias: [],
  categoriaPorId: null,
  error: null,
  categoriaSelecionada: null
};

const categoriaReducer = (state = initialState, action) => {
  switch (action.type) {
    case TypesCategoria.ADICIONAR_CATEGORIA_REDUCER:
      return {
        ...state,
        categorias: [...state.categorias, action.payload],
      };
    case TypesCategoria.CARREGAR_CATEGORIAS_REDUCER:
      return {
        ...state,
        categorias: action.payload,
      };
    case TypesCategoria.CARREGAR_CATEGORIA_POR_ID_REDUCER:
      return {
        ...state,
        categoriaPorId: action.payload,
      };
    case TypesCategoria.CARREGAR_NOME_SUBCATEGORIAS_REDUCER:
      return {
        ...state,
        nomeSubcategorias: action.payload,
      };
    case TypesCategoria.ATUALIZAR_CATEGORIA_REDUCER:
      return {
        ...state,
        categorias: state.categorias.map((categoria) =>
          categoria.id === action.payload.id ? action.payload : categoria
        ),
        categoriaPorId:
          state.categoriaPorId && state.categoriaPorId.id === action.payload.id
            ? action.payload
            : state.categoriaPorId,
      };
    case TypesCategoria.SET_CATEGORIA_SELECIONADA_REDUCER:
      return {
        ...state,
        categoriaSelecionada: action.payload
      }
    case TypesCategoria.EXCLUIR_CATEGORIA_REDUCER:
      return {
        ...state,
        categorias: state.categorias.filter(
          (categoria) => categoria.id !== action.payload
        ),
        categoriaPorId:
          state.categoriaPorId && state.categoriaPorId.id === action.payload
            ? null
            : state.categoriaPorId,
      };
    case TypesCategoria.ERRO_CATEGORIA_REDUCER:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adicionarCategoriaReducer = (categoria) => ({
  type: TypesCategoria.ADICIONAR_CATEGORIA_REDUCER,
  payload: {
    idCategoria: categoria.idCategoria,
    dscCategoria: categoria.dscCategoria
  },
});

const carregarCategoriasReducer = (categorias) => ({
  type: TypesCategoria.CARREGAR_CATEGORIAS_REDUCER,
  payload: categorias,
});

const carregarCategoriasPorIdReducer = (categoriaPorId) => ({
  type: TypesCategoria.CARREGAR_CATEGORIA_POR_ID_REDUCER,
  payload: categoriaPorId,
});

const carregarNomeSubcategoriasReducer = (nomeSubcategorias) => ({
  type: TypesCategoria.CARREGAR_NOME_SUBCATEGORIAS_REDUCER,
  payload: nomeSubcategorias,
});

const atualizarCategoriaReducer = (categoria) => ({
  type: TypesCategoria.ATUALIZAR_CATEGORIA_REDUCER,
  payload: categoria,
});

const setCategoriaSelecionadaReducer = (categoriaSelecionada) => ({
  type: TypesCategoria.SET_CATEGORIA_SELECIONADA_REDUCER,
  payload: categoriaSelecionada
});

const excluirCategoriaReducer = (idCategoria) => ({
  type: TypesCategoria.EXCLUIR_CATEGORIA_REDUCER,
  payload: idCategoria,
});

const erroCategoriaReducer = (error) => ({
  type: TypesCategoria.ERRO_CATEGORIA_REDUCER,
  payload: error,
});

export const categoriaActions = {
  adicionarCategoriaReducer,
  carregarCategoriasReducer,
  carregarCategoriasPorIdReducer,
  carregarNomeSubcategoriasReducer,
  atualizarCategoriaReducer,
  setCategoriaSelecionadaReducer,
  excluirCategoriaReducer,
  erroCategoriaReducer,
};

export default categoriaReducer;
