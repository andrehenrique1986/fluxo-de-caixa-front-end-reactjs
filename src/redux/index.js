import { combineReducers } from 'redux';
import categoriaReducer from './reducers/categoriaReducer';
import subcategoriaReducer from './reducers/subcategoriaReducer';
import formaDePagamentoReducer from './reducers/formaDePagamentoReducer';
import fluxoReducer from './reducers/fluxoReducer';
import custoReducer from './reducers/custoReducer';
import registroReducer from './reducers/registroReducer';

const rootReducer = combineReducers({
  categorias: categoriaReducer,
  subcategorias: subcategoriaReducer,
  formasDePagamento: formaDePagamentoReducer,
  fluxos: fluxoReducer,
  custos: custoReducer,
  registros: registroReducer
});

export default rootReducer;


