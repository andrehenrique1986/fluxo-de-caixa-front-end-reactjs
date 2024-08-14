import { combineReducers } from 'redux';
import categoriaReducer from '../reducers/categoriaReducer'; 
import subcategoriaReducer from './subcategoriaReducer';

const rootReducer = combineReducers({
  categorias: categoriaReducer,
  subcategorias: subcategoriaReducer
  
});

export default rootReducer;
