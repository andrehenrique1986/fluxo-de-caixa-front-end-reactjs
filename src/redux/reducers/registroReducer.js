const TypesRegistro = {
  ADICIONAR_REGISTRO_REDUCER: 'ADICIONAR_REGISTRO_REDUCER',
  CARREGAR_REGISTRO_REDUCER: 'CARREGAR_REGISTRO_REDUCER',
  CARREGAR_REGISTRO_POR_ID_REDUCER: 'CARREGAR_REGISTRO_POR_ID_REDUCER', 
  ATUALIZAR_REGISTRO_REDUCER: 'ATUALIZAR_REGISTRO_REDUCER',
  SET_REGISTRO_ATUAL_REDUCER: "SET_REGISTRO_ATUAL_REDUCER",
  EXCLUIR_REGISTRO_REDUCER: 'EXCLUIR_REGISTRO_REDUCER',
  CALC_GASTOS_POR_CATEGORIA_REDUCER: 'CALC_GASTOS_POR_CATEGORIA_REDUCER',
  CALC_REGISTRO_POR_FORMA_PGTO_REDUCER: 'CALC_REGISTRO_POR_FORMA_PGTO_REDUCER',
  CALC_PORCENTAGEM_POR_CUSTO_REDUCER: 'CALC_PORCENTAGEM_POR_CUSTO_REDUCER',
  CALC_REGISTRO_POR_FLUXO_REDUCER: 'CALC_REGISTRO_POR_FLUXO_REDUCER',  
  ERRO_REGISTRO_REDUCER: 'ERRO_REGISTRO_REDUCER'
};

const initialState = {
  registros: [],
  error: null,
  registroPorId: null,
  gastosPorCategoria: null,
  registroPorFormaDePagamento: null,
  porcentagemPorCusto: null,
  registroPorFluxo: null,
  registroAtual: null
};

const registroReducer = (state = initialState, action) => {
   console.log('Ação recebida:', action);
  switch (action.type) {
    case TypesRegistro.ADICIONAR_REGISTRO_REDUCER:
      return {
        ...state,
        registros: [...state.registros, action.payload],
      };
    case TypesRegistro.CARREGAR_REGISTRO_REDUCER:
      return {
        ...state,
        registros: action.payload, 
      };
    case TypesRegistro.CARREGAR_REGISTRO_POR_ID_REDUCER:
      return {
        ...state,
        registroPorId: action.payload,
      };
    case TypesRegistro.ATUALIZAR_REGISTRO_REDUCER:
      return {
        ...state,
        registros: state.registros.map((registro) =>
          registro.idRegistro === action.payload.idRegistro ? action.payload : registro
        ),
        registroPorId:
          state.registroPorId && state.registroPorId.idRegistro === action.payload.idRegistro
            ? action.payload
            : state.registroPorId,
      };
    case TypesRegistro.SET_REGISTRO_ATUAL_REDUCER:
      return {
        ...state,
        registroAtual: action.payload
      };
    case TypesRegistro.EXCLUIR_REGISTRO_REDUCER:
      return {
        ...state,
        registros: state.registros.filter(
          registro => registro.idRegistro !== action.payload
        ),
        registroPorId: state.registroPorId && state.registroPorId.idRegistro === action.payload
          ? null
          : state.registroPorId
      };  
    case TypesRegistro.CALC_GASTOS_POR_CATEGORIA_REDUCER:
      return {
        ...state,
        gastosPorCategoria: action.payload
      };
    case TypesRegistro.CALC_REGISTRO_POR_FORMA_PGTO_REDUCER:
      return {
        ...state,
        registroPorFormaDePagamento: action.payload
      };
    case TypesRegistro.CALC_PORCENTAGEM_POR_CUSTO_REDUCER:
      return {
        ...state,
        porcentagemPorCusto: action.payload
      };
    case TypesRegistro.CALC_REGISTRO_POR_FLUXO_REDUCER:
      return {
        ...state,
        registroPorFluxo: action.payload
      };
    case TypesRegistro.ERRO_REGISTRO_REDUCER:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export const adicionarRegistroReducer = (registro) => ({
  type: TypesRegistro.ADICIONAR_REGISTRO_REDUCER,
  payload: {
    idRegistro: registro.idRegistro,
    idFluxo: registro.idFluxo,
    idCategoria: registro.idCategoria, 
    idSubcategoria: registro.idSubcategoria, 
    idCusto: registro.idCusto, 
    idFormaDePagamento: registro.idFormaDePagamento,
    dtRegistro: registro.dtRegistro,
    valorRegistro: registro.valorRegistro,
  }
});

export const carregarRegistrosReducer = (registros) => ({
  type: TypesRegistro.CARREGAR_REGISTRO_REDUCER,
  payload: registros,
});

export const carregarRegistroPorIdReducer = (registro) => ({
  type: TypesRegistro.CARREGAR_REGISTRO_POR_ID_REDUCER,
  payload: registro,
});

export const atualizarRegistroReducer = (registro) => ({
  type: TypesRegistro.ATUALIZAR_REGISTRO_REDUCER,
  payload: {
      idRegistro: registro.idRegistro,
      idFluxo: registro.idFluxo,
      idCategoria: registro.idCategoria, 
      idSubcategoria: registro.idSubcategoria, 
      idCusto: registro.idCusto, 
      idFormaDePagamento: registro.idFormaDePagamento,
      dtRegistro: registro.dtRegistro,
      valorRegistro: registro.valorRegistro,
  },
});

const setRegistroAtualReducer = (registroAtual) => ({
  type: TypesRegistro.SET_REGISTRO_ATUAL_REDUCER,
  payload: registroAtual
});

export const excluirRegistroReducer = (idRegistro) => ({
  type: TypesRegistro.EXCLUIR_REGISTRO_REDUCER,
  payload: idRegistro,
});

export const calcGastosPorCategoriaReducer = (gastos) => ({
  type: TypesRegistro.CALC_GASTOS_POR_CATEGORIA_REDUCER,
  payload: gastos,
});

export const calcRegistroPorFormaDePagamentoReducer = (registros) => ({
  type: TypesRegistro.CALC_REGISTRO_POR_FORMA_PGTO_REDUCER,
  payload: registros,
});

export const calcPorcentagemPorCustoReducer = (porcentagem) => ({
  type: TypesRegistro.CALC_PORCENTAGEM_POR_CUSTO_REDUCER,
  payload: porcentagem,
});

export const calcRegistroPorFluxoReducer = (registros) => ({
  type: TypesRegistro.CALC_REGISTRO_POR_FLUXO_REDUCER,
  payload: registros,
});

export const erroRegistroReducer = (error) => ({
  type: TypesRegistro.ERRO_REGISTRO_REDUCER,
  payload: error,
});

export const registroActions = {
  adicionarRegistroReducer,
  carregarRegistrosReducer,
  carregarRegistroPorIdReducer,
  atualizarRegistroReducer,
  setRegistroAtualReducer,
  excluirRegistroReducer,
  calcGastosPorCategoriaReducer,
  calcRegistroPorFormaDePagamentoReducer,
  calcPorcentagemPorCustoReducer,
  calcRegistroPorFluxoReducer,
  erroRegistroReducer
}

export default registroReducer;