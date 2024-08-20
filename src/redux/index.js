import { combineReducers } from 'redux';
import categoriaReducer from './reducers/categoriaReducer';
import subcategoriaReducer from './reducers/subcategoriaReducer';
import formaDePagamentoReducer from './reducers/formaDePagamentoReducer';

const rootReducer = combineReducers({
  categorias: categoriaReducer,
  subcategorias: subcategoriaReducer,
  formasDePagamento: formaDePagamentoReducer

});

export default rootReducer;


