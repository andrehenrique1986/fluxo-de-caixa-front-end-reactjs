import { legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import rootReducer from './index'; 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['categorias', 'subcategorias', 'formasDePagamento', 'fluxos', 'custos', 'registros'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
