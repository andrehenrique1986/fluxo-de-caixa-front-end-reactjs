const TypesFormaDePagamento = {
    ADICIONAR_FORMA_DE_PAGAMENTO_REDUCER: "ADICIONAR_FORMA_DE_PAGAMENTO_REDUCER",
    CARREGAR_FORMAS_DE_PAGAMENTO_REDUCER: "CARREGAR_FORMAS_DE_PAGAMENTO_REDUCER",
    CARREGAR_FORMA_DE_PAGAMENTO_POR_ID_REDUCER: "CARREGAR_FORMA_DE_PAGAMENTO_POR_ID_REDUCER",
    ATUALIZAR_FORMA_DE_PAGAMENTO_REDUCER: "ATUALIZAR_FORMA_DE_PAGAMENTO_REDUCER",
    SET_FORMA_DE_PAGAMENTO_SELECIONADA_REDUCER: "SET_FORMA_DE_PAGAMENTO_SELECIONADA_REDUCER",
    EXCLUIR_FORMA_DE_PAGAMENTO_REDUCER: "EXCLUIR_FORMA_DE_PAGAMENTO_REDUCER",
    ERRO_FORMA_DE_PAGAMENTO_REDUCER: "ERRO_FORMA_DE_PAGAMENTO_REDUCER",
  };
  
  const initialState = {
    formasDePagamento: [{
      idFormaDePagamento: 0,
      dscFormaDePagamento: ''
    }],
    formaDePagamentoPorId: null,
    error: null,
    formaDePagamentoSelecionada: null
  };
  
  const formaDePagamentoReducer = (state = initialState, action) => {
    switch (action.type) {
      case TypesFormaDePagamento.ADICIONAR_FORMA_DE_PAGAMENTO_REDUCER:
        return {
          ...state,
          formasDePagamento: [...state.formasDePagamento, action.payload],
        };
      case TypesFormaDePagamento.CARREGAR_FORMAS_DE_PAGAMENTO_REDUCER:
        return {
          ...state,
          formasDePagamento: action.payload,
        };
      case TypesFormaDePagamento.CARREGAR_FORMA_DE_PAGAMENTO_POR_ID_REDUCER:
        return {
          ...state,
          formaDePagamentoPorId: action.payload,
        };
        case TypesFormaDePagamento.ATUALIZAR_FORMA_DE_PAGAMENTO_REDUCER:
          return {
            ...state,
            formasDePagamento: state.formasDePagamento.map((formaDePagamento) =>
              formaDePagamento.idFormaDePagamento === action.payload.idFormaDePagamento ? action.payload : formaDePagamento
            ),
          };
      case TypesFormaDePagamento.SET_FORMA_DE_PAGAMENTO_SELECIONADA_REDUCER:
        return {
          ...state,
          formaDePagamentoSelecionada: action.payload
        }
      case TypesFormaDePagamento.EXCLUIR_FORMA_DE_PAGAMENTO_REDUCER:
        return {
          ...state,
          formasDePagamento: state.formasDePagamento.filter(
            (formaDePagamento) => formaDePagamento.idFormaDePagamento !== action.payload
          ),
          formaDePagamentoPorId:
            state.formaDePagamentoPorId && state.formaDePagamentoPorId.idFormaDePagamento === action.payload
              ? null
              : state.formaDePagamentoPorId,
        };
      case TypesFormaDePagamento.ERRO_FORMA_DE_PAGAMENTO_REDUCER:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const adicionarFormaDePagamentoReducer = (formaDePagamento) => ({
    type: TypesFormaDePagamento.ADICIONAR_FORMA_DE_PAGAMENTO_REDUCER,
    payload: {
      idFormaDePagamento: formaDePagamento.idFormaDePagamento,
      dscFormaDePagamento: formaDePagamento.dscFormaDePagamento
    },
  });
  
  const carregarFormaDePagamentoReducer = (formasDePagamento) => ({
    type: TypesFormaDePagamento.CARREGAR_FORMAS_DE_PAGAMENTO_REDUCER,
    payload: formasDePagamento,
  });
  
  const carregarFormaDePagamentoPorIdReducer = (formaDePagamentoPorId) => ({
    type: TypesFormaDePagamento.CARREGAR_FORMA_DE_PAGAMENTO_POR_ID_REDUCER,
    payload: formaDePagamentoPorId,
  });
  
  
  const atualizarFormaDePagamentoReducer = (formaDePagamento) => ({
    type: TypesFormaDePagamento.ATUALIZAR_FORMA_DE_PAGAMENTO_REDUCER,
    payload: formaDePagamento,
  });
  
  const setFormaDePagamentoSelecionadaReducer = (formaDePagamentoSelecionada) => ({
    type: TypesFormaDePagamento.SET_FORMA_DE_PAGAMENTO_SELECIONADA_REDUCER,
    payload: formaDePagamentoSelecionada
  });
  
  const excluirFormaDePagamentoReducer = (idFormaDePagamento) => ({
    type: TypesFormaDePagamento.EXCLUIR_FORMA_DE_PAGAMENTO_REDUCER,
    payload: idFormaDePagamento,
  });
  
  const erroFormaDePagamentoReducer = (error) => ({
    type: TypesFormaDePagamento.ERRO_FORMA_DE_PAGAMENTO_REDUCER,
    payload: error,
  });
  
  export const formaDePagamentoActions = {
    adicionarFormaDePagamentoReducer,
    carregarFormaDePagamentoReducer,
    carregarFormaDePagamentoPorIdReducer,
    atualizarFormaDePagamentoReducer,
    setFormaDePagamentoSelecionadaReducer,
    excluirFormaDePagamentoReducer,
    erroFormaDePagamentoReducer 
  };
  
  export default formaDePagamentoReducer;
  