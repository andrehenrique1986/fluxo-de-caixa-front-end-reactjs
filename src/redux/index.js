import { combineReducers } from 'redux';
import categoriaReducer from './reducers/categoriaReducer';
import subcategoriaReducer from './reducers/subcategoriaReducer';


const rootReducer = combineReducers({
  categorias: categoriaReducer,
  subcategorias: subcategoriaReducer,

});

export default rootReducer;


